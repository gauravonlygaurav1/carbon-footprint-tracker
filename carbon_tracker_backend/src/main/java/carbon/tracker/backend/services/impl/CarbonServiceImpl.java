package carbon.tracker.backend.services.impl;

import carbon.tracker.backend.dtos.local.DashboardSummaryResponse;
import carbon.tracker.backend.dtos.local.*;
import carbon.tracker.backend.entities.Carbon;
import carbon.tracker.backend.entities.Goal;
import carbon.tracker.backend.entities.User;
import carbon.tracker.backend.entities.enums.ActivityType;
import carbon.tracker.backend.helpers.AirportCoordinates;
import carbon.tracker.backend.repositories.CarbonRepository;
import carbon.tracker.backend.repositories.GoalRepository;
import carbon.tracker.backend.services.AirportCalculator;
import carbon.tracker.backend.services.CarbonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CarbonServiceImpl implements CarbonService {

    private final CarbonRepository carbonRepository;
    private final AirportCalculator airportCalculator;
    private final GoalRepository goalRepository;

    private static final double EMISSION_FACTOR_PER_KWH = 0.233;
    private double roundToTwoDecimals(double value){
        return Math.round(value * 100.0) / 100.0;
    }

    private void saveActivity(User user, ActivityType type, double co2, String details){
        Carbon carbonOb= carbon.tracker.backend.entities.Carbon.builder()
                .activityType(type)
                .emissionValue(co2)
                .activityDetails(details)
                .createdAt(Instant.now())
                .user(user)
                .build();

        carbonRepository.save(carbonOb);
    }

    @Override
    public EmissionResponse drivingActivity(DrivingRequest req, User user) {

        String details= "Driving - "+ req.distance() + " km by " + req.vehicleType().name();
        double co2= req.distance()*req.vehicleType().getEmissionPerKm();
        co2 = roundToTwoDecimals(co2);
        saveActivity(user, ActivityType.DRIVING, co2, details);
        return new EmissionResponse(
                co2,
                "DRIVING",
                "Driving emission calculated successfully"
        );
    }

    @Override
    public EmissionResponse electricityActivity(ElectricityRequest req, User user) {

        String details= "Electricity - "+ req.consumption() + " kWh";
        double co2= req.consumption()*EMISSION_FACTOR_PER_KWH;
        co2 = roundToTwoDecimals(co2);
        saveActivity(user, ActivityType.ELECTRICITY, co2, details);
        return new EmissionResponse(
                co2,
                "ELECTRICITY",
                "Electricity emission calculated successfully"
        );
    }

    @Override
    public EmissionResponse foodActivity(FoodRequest req, User user) {

        String details= "Food - "+ req.foodType().name() + " meal";
        double co2= req.weightKg()*req.foodType().getEmissionPerKg();
        co2 = roundToTwoDecimals(co2);
        saveActivity(user, ActivityType.FOOD, co2, details);
        return new EmissionResponse(
                co2,
                "FOOD",
                "Food emission calculated successfully"
        );
    }

    @Override
    public EmissionResponse flightActivity(FlightRequest req, User user) {

        double[] sourceCoords = AirportCoordinates.getCoordinates(req.source());
        double[] destCoords = AirportCoordinates.getCoordinates(req.destination());

        if (sourceCoords == null || destCoords == null) {
            throw new IllegalArgumentException("Invalid airport codes");
        }

        double distance = airportCalculator.haversine(
                sourceCoords[0], sourceCoords[1],
                destCoords[0], destCoords[1]
        );

        String details= "Flight - "+ req.source() + " -> " + req.destination();
        double co2 = distance * req.flightType().getEmissionPerKm();
        co2 = roundToTwoDecimals(co2);

        saveActivity(user, ActivityType.FLIGHT, co2, details);

        return new EmissionResponse(
                co2,
                "FLIGHT",
                "Flight emission calculated successfully"
        );
    }

    @Override
    public DashboardSummaryResponse getDashboardSummary(UUID userId) {

        List<RecentActivityResponse> recently_5= carbonRepository
                .findTop5ByUser_IdOrderByCreatedAtDesc(userId)
                .stream()
                .map(activity -> RecentActivityResponse
                        .builder()
                        .activityType(activity.getActivityType().name())
                        .emissionValue(activity.getEmissionValue())
                        .activityDetails(activity.getActivityDetails())
                        .build()
                ).toList();

        double totalEmission= carbonRepository.getTotalEmission(userId);
        double ecoScore = Math.max(0, 1000- totalEmission);
        double displayScore = Math.round(((ecoScore/1000)*100)*100.0)/100.0;

        return DashboardSummaryResponse
                .builder()
                .totalEmission(totalEmission)
                .drivingEmission(carbonRepository.getEmissionByType(userId, ActivityType.DRIVING))
                .foodEmission(carbonRepository.getEmissionByType(userId, ActivityType.FOOD))
                .electricityEmission(carbonRepository.getEmissionByType(userId, ActivityType.ELECTRICITY))
                .flightEmission(carbonRepository.getEmissionByType(userId, ActivityType.FLIGHT))
                .recentActivities(recently_5)
                .ecoScore(displayScore)
                .build();
    }

    @Override
    public List<AnalyticsDataResponse> getWeeklyAnalytics(UUID userId) {

        List<Object[]> results = carbonRepository.getWeeklyAnalytics(userId);

        return results.stream()
                .map(row -> AnalyticsDataResponse
                        .builder()
                        .date(row[0].toString())
                        .emission(((Number) row[1]).doubleValue())
                        .build()
                )
                .toList();
    }

    @Override
    public GoalResponse createGoal(GoalRequest request, User user) {

        Goal goal = Goal.builder()
                .targetEmission(request.targetEmission())
                .startDate(Instant.now())
                .endDate(Instant.now().plusSeconds(30L * 24 * 60 * 60))
                .achieved(false)
                .user(user)
                .build();

        goalRepository.save(goal);

        return getGoalProgress(user.getId());
    }

    @Override
    public GoalResponse getGoalProgress(UUID userId) {

        Goal goal = goalRepository
                .findByUser_Id(userId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        Double currentEmission = carbonRepository.getTotalEmission(userId);

        double progress = (currentEmission / goal.getTargetEmission()) * 100;

        progress = Math.min(progress, 100);

        String status;

        if (progress < 50) {
            status = "Excellent";
        }
        else if (progress > 50 && progress < 80) {
            status = "Warning";
        }
        else {
            status = "Critical";
        }

        String goalInsights;
        double driving= carbonRepository.getEmissionByType(userId, ActivityType.DRIVING);
        double food= carbonRepository.getEmissionByType(userId, ActivityType.FOOD);
        double electricity= carbonRepository.getEmissionByType(userId, ActivityType.ELECTRICITY);
        double flight= carbonRepository.getEmissionByType(userId, ActivityType.FLIGHT);

        if (currentEmission < goal.getTargetEmission()) {
            // CHECK HIGHEST EMISSION SOURCE

            if (driving >= food && driving >= electricity && driving >= flight) {
                goalInsights = "Driving emissions are highest. Try using public transport, carpooling, or shorter travel routes.";
            }
            else if (food >= driving && food >= electricity && food >= flight) {
                goalInsights = "Food emissions are highest. Consider reducing meat consumption and choosing sustainable meals.";
            }
            else if (electricity >= driving && electricity >= food && electricity >= flight) {
                goalInsights = "Electricity usage is highest. Try switching off unused appliances and using energy-efficient devices.";
            }
            else {
                goalInsights ="Flight emissions are highest. Try reducing air travel or choosing alternative transportation when possible.";
            }
        }

        else {
            goalInsights = "Your emissions have exceeded the target. Focus on eco-friendly alternatives to recover your goal.";
        }

        return GoalResponse.builder()
                .targetEmission(goal.getTargetEmission())
                .currentEmission(currentEmission)
                .progressPercentage(roundToTwoDecimals(progress))
                .status(status)
                .suggestion(goalInsights)
                .build();

    }


}

