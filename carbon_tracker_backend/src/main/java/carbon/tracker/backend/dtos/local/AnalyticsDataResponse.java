package carbon.tracker.backend.dtos.local;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AnalyticsDataResponse {

    private String date;
    private double emission;
}
