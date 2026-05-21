package carbon.tracker.backend.repositories;

import carbon.tracker.backend.entities.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface GoalRepository extends JpaRepository<Goal, UUID> {

    Optional<Goal> findByUser_Id(UUID userId);
}