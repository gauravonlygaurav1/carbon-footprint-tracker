package carbon.tracker.backend.services;

import carbon.tracker.backend.dtos.UserDto;

public interface AuthService {

    UserDto registerUser(UserDto userDto);

}
