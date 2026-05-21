package carbon.tracker.backend.dtos;

public record LoginRequest(
        String email,
        String password
) {

}
