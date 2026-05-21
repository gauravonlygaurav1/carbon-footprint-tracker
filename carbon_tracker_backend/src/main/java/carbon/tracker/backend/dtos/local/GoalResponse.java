package carbon.tracker.backend.dtos.local;

import lombok.Builder;

@Builder
public record GoalResponse(

        Double targetEmission,
        Double currentEmission,
        Double progressPercentage,
        String status,
        String suggestion
) {
}
