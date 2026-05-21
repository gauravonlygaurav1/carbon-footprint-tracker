package carbon.tracker.backend.repositories;

import carbon.tracker.backend.entities.Carbon;
import carbon.tracker.backend.entities.User;
import carbon.tracker.backend.entities.enums.ActivityType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface CarbonRepository extends JpaRepository<Carbon, UUID> {

    List<Carbon> findAllByUser(User user);

    List<Carbon> findTop5ByUser_IdOrderByCreatedAtDesc(UUID userId);

    @Query("""
    SELECT ROUND(COALESCE(SUM(c.emissionValue),0), 3)
    FROM Carbon c
    WHERE c.user.id = :userId
    """)
    Double getTotalEmission(UUID userId);

    @Query("""
    SELECT COALESCE(SUM(c.emissionValue),0)
    FROM Carbon c
    WHERE c.user.id = :userId
    AND c.activityType = :activityType
    """)
    Double getEmissionByType(UUID userId, ActivityType activityType);

    @Query("""
    SELECT DATE(c.createdAt),
    SUM(c.emissionValue)
    FROM Carbon c
    WHERE c.user.id = :userId
    GROUP BY DATE(c.createdAt)
    ORDER BY DATE(c.createdAt)
    """)
    List<Object[]> getWeeklyAnalytics(UUID userId);

}
