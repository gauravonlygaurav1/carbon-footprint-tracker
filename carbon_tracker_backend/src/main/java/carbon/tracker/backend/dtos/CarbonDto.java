package carbon.tracker.backend.dtos;

import carbon.tracker.backend.entities.enums.ActivityType;
import carbon.tracker.backend.entities.User;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class CarbonDto {

    private UUID id;

    private User user;

    private ActivityType activityType;

    private double emissionValue;

    private Instant createdAt= Instant.now();

}
