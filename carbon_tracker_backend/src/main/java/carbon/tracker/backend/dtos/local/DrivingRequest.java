package carbon.tracker.backend.dtos.local;

import carbon.tracker.backend.entities.enums.VehicleType;

public record DrivingRequest(
        double distance,
        VehicleType vehicleType
) {}