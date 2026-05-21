package carbon.tracker.backend.entities;

import carbon.tracker.backend.entities.enums.ActivityType;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

@Entity
@Table(name= "carbon")
public class Carbon {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name= "carbon_id")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    private ActivityType activityType;

    @Column(nullable = true)
    private String activityDetails;

    private double emissionValue;

    private Instant createdAt;

    @PrePersist
    protected void onCreate(){
        createdAt= Instant.now();
    }
}
