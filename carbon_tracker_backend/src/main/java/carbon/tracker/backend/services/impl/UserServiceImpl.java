package carbon.tracker.backend.services.impl;

import carbon.tracker.backend.config.AppConstants;
import carbon.tracker.backend.dtos.UserDto;
import carbon.tracker.backend.entities.Role;
import carbon.tracker.backend.entities.enums.Provider;
import carbon.tracker.backend.entities.User;
import carbon.tracker.backend.expections.ResourceNotFoundException;
import carbon.tracker.backend.helpers.UserHelper;
import carbon.tracker.backend.repositories.RoleRepository;
import carbon.tracker.backend.repositories.UserRepository;
import carbon.tracker.backend.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashSet;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final RoleRepository roleRepository;
    @Override
    @Transactional
    public UserDto createUser(UserDto userDto) {

        if(userDto.getEmail() == null || userDto.getEmail().isBlank()){
            throw new IllegalArgumentException("Email is Required");
        }

        if(userRepository.existsByEmail(userDto.getEmail())){
            throw new IllegalArgumentException("User with given email already exists");
        }

        User user= modelMapper.map(userDto, User.class);

        user.setProvider(userDto.getProvider()!= null ? userDto.getProvider() : Provider.LOCAL);

        //assign the default role
        Role role= roleRepository.findByName("ROLE_"+ AppConstants.USER_ROLE).orElseThrow(()-> new RuntimeException("Role not found"));

        if(user.getRoles() == null){
            user.setRoles(new HashSet<>());
        }
        user.getRoles().add(role);

        User savedUser= userRepository.save(user);

        return modelMapper.map(savedUser, UserDto.class);
    }

    @Override
    public UserDto getUserByEmail(String email) {

        User user= userRepository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User not found with given email id"));

        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public UserDto updateUser(UserDto userDto, String userId) {

        UUID uId= UserHelper.parseUUID(userId);
        User existingUser= userRepository.findById(uId).orElseThrow(()-> new ResourceNotFoundException("User not found with given id"));

        //Not change email id for this project
        if(userDto.getName() != null) existingUser.setName(userDto.getName());
        if(userDto.getImage() != null) existingUser.setImage(userDto.getImage());
        if(userDto.getProvider() != null) existingUser.setProvider(userDto.getProvider());
        if(userDto.getPassword() != null) existingUser.setPassword(userDto.getPassword());
//        existingUser.setEnable(userDto.isEnable());
        existingUser.setUpdatedAt(Instant.now());
        User updateUser= userRepository.save(existingUser);

        return modelMapper.map(updateUser, UserDto.class);
    }

    @Override
    public void deleteUser(String userId) {
        UUID uId= UserHelper.parseUUID(userId);
        User user= userRepository.findById(uId).orElseThrow(()-> new ResourceNotFoundException("User not found with given id"));
        userRepository.delete(user);
    }

    @Override
    public UserDto getUserById(String userId) {

        User user= userRepository.findById(UserHelper.parseUUID(userId)).orElseThrow(()-> new ResourceNotFoundException("User not found with given id"));
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    @Transactional
    public Iterable<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(user -> modelMapper.map(user, UserDto.class)).toList();
    }
}
