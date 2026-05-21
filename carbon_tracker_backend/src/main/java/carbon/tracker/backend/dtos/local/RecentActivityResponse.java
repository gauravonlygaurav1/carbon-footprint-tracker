package carbon.tracker.backend.dtos.local;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecentActivityResponse {

    private String activityType;
    private double emissionValue;
    private String activityDetails;
}
