package carbon.tracker.backend.services;

import carbon.tracker.backend.dtos.local.DashboardSummaryResponse;
import carbon.tracker.backend.dtos.local.*;
import carbon.tracker.backend.entities.User;

import java.util.List;
import java.util.UUID;

public interface CarbonService {

    EmissionResponse drivingActivity(DrivingRequest req, User user);

    EmissionResponse electricityActivity(ElectricityRequest req, User user);

    EmissionResponse foodActivity(FoodRequest req, User user );

    EmissionResponse flightActivity(FlightRequest req, User user);

    DashboardSummaryResponse getDashboardSummary(UUID userId);

    List<AnalyticsDataResponse> getWeeklyAnalytics(UUID userId);

    GoalResponse createGoal(GoalRequest request, User user);

    GoalResponse getGoalProgress(UUID userId);

}
