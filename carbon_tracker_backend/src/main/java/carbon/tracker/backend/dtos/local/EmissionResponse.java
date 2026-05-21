package carbon.tracker.backend.dtos.local;

public record EmissionResponse(
        double co2EmissionKg,
        String activityType,
        String message
) {}
