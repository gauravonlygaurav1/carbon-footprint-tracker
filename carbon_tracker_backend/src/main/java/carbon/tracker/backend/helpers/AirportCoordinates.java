package carbon.tracker.backend.helpers;

import java.util.Map;

public class AirportCoordinates {

    public static final Map<String, double[]> COORDINATES = Map.of(
            "DELHI", new double[]{28.5562, 77.1000}, // Delhi
            "MUMBAI", new double[]{19.0896, 72.8656}, // Mumbai
            "BANGALORE", new double[]{12.9716, 77.5946}, // Bangalore
            "DUBAI", new double[]{25.2532, 55.3657}, // Dubai
            "LONDON", new double[]{51.4700, -0.4543}  // London Heathrow
    );

    public static double[] getCoordinates(String code) {
        return COORDINATES.get(code.toUpperCase());
    }
}
