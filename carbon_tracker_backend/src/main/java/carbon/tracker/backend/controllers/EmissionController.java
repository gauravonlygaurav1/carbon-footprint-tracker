package carbon.tracker.backend.controllers;

import carbon.tracker.backend.dtos.local.DashboardSummaryResponse;
import carbon.tracker.backend.dtos.local.*;
import carbon.tracker.backend.entities.User;
import carbon.tracker.backend.services.CarbonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/emission")
@RequiredArgsConstructor
public class EmissionController {

    private final CarbonService carbonService;

    @PostMapping("/driving")
    public ResponseEntity<EmissionResponse> drivingEmission(@RequestBody DrivingRequest request,
                                                            @AuthenticationPrincipal User user) {
        EmissionResponse response = carbonService.drivingActivity(request, user);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/electricity")
    public ResponseEntity<EmissionResponse> electricityEmission(@RequestBody ElectricityRequest request,
                                                                @AuthenticationPrincipal User user) {
        EmissionResponse response = carbonService.electricityActivity(request, user);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/food")
    public ResponseEntity<EmissionResponse> foodEmission(@RequestBody FoodRequest request,
                                                         @AuthenticationPrincipal User user) {
        EmissionResponse response = carbonService.foodActivity(request, user);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/flight")
    public ResponseEntity<EmissionResponse> fligthEmission(@RequestBody FlightRequest request,
                                                           @AuthenticationPrincipal User user) {
        EmissionResponse response = carbonService.flightActivity(request, user);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardSummaryResponse> getSummary(@AuthenticationPrincipal User user){

        DashboardSummaryResponse response = carbonService.getDashboardSummary(user.getId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/analytics")
    public ResponseEntity<List<AnalyticsDataResponse>>
    getWeeklyAnalytics(@AuthenticationPrincipal User user){

        return ResponseEntity.ok(carbonService.getWeeklyAnalytics(user.getId()));
    }

    @PostMapping("/goal")
    public ResponseEntity<GoalResponse> creatingGoal(@RequestBody GoalRequest request, @AuthenticationPrincipal User user){

        return ResponseEntity.ok(carbonService.createGoal(request, user));
    }

    @GetMapping("/goal")
    public ResponseEntity<GoalResponse> getGoal(@AuthenticationPrincipal User user){

        return ResponseEntity.ok(carbonService.getGoalProgress(user.getId()));
    }
}
