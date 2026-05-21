package carbon.tracker.backend.dtos.local;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DashboardSummaryResponse {

    private double totalEmission;
    private double drivingEmission;
    private double foodEmission;
    private double electricityEmission;
    private double flightEmission;
    private Double ecoScore;
    private List<RecentActivityResponse> recentActivities;
}
