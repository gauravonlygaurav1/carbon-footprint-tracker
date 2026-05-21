package carbon.tracker.backend.dtos.local;

import carbon.tracker.backend.entities.enums.FoodType;

public record FoodRequest(
        FoodType foodType,
        double weightKg
) {}
