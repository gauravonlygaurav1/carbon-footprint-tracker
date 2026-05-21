package carbon.tracker.backend.dtos.local;

import carbon.tracker.backend.entities.enums.FlightType;

public record FlightRequest(
        String source,
        String destination,
        FlightType flightType
) {}
