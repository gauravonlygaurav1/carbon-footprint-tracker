package carbon.tracker.backend.entities.enums;

public enum FoodType {

    BEEF(27.0), // kg CO2 per kg
    CHICKEN(6.9),
    FISH(5.4),
    RICE(4.0),
    PIZZA(5.0),
    BURGER(7.5),
    LAMB(39.2),
    MOMO(4.0),
    COFFEE(5.0);


    private final double emissionPerKg;

    FoodType(double emissionPerKg) {
        this.emissionPerKg = emissionPerKg;
    }

    public double getEmissionPerKg() {
        return emissionPerKg;
    }
}
