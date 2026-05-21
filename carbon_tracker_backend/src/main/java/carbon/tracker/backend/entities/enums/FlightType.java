package carbon.tracker.backend.entities.enums;

public enum FlightType {
    ECONOMY(0.11), // kg CO2 per passenger-km
    BUSINESS(0.15);

    private final double emissionPerKm;

    FlightType(double emissionPerKm) {
        this.emissionPerKm = emissionPerKm;
    }

    public double getEmissionPerKm() {
        return emissionPerKm;
    }
}
