package carbon.tracker.backend.entities.enums;

public enum VehicleType {
    PETROL_CAR(0.192), // kg CO₂ per km
    CNG(0.148),
    DIESEL_CAR(0.171),
    ELECTRIC_CAR(0.050),
    BIKE(0.08),
    E_RICKSHAW(0.02),
    BUS(0.10),
    TRUCK(0.35),
    CAR(0.080);

    private final double emissionPerKm;

    VehicleType(double emissionPerKm) {
        this.emissionPerKm = emissionPerKm;
    }

    public double getEmissionPerKm() {
        return emissionPerKm;
    }
}
