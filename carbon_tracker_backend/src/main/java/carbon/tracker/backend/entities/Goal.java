package carbon.tracker.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private Double targetEmission;

    private Instant startDate;

    private Instant endDate;

    private boolean achieved;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}