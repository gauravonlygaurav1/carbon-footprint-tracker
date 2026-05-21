package carbon.tracker.backend;

import carbon.tracker.backend.config.AppConstants;
import carbon.tracker.backend.entities.Role;
import carbon.tracker.backend.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.UUID;

@SpringBootApplication
public class CarbonTrackerBackendApplication implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

	public static void main(String[] args) {
        SpringApplication.run(CarbonTrackerBackendApplication.class, args);
	}

    @Override
    public void run(String... args) throws Exception {

        roleRepository.findByName("ROLE_"+AppConstants.ADMIN_ROLE).ifPresentOrElse(role->{
            System.out.println("Admin Role Already Exists: "+role.getName());
        }, ()->{

            Role role = new Role();
            role.setName("ROLE_"+AppConstants.ADMIN_ROLE);
            role.setId(UUID.randomUUID());
            roleRepository.save(role);
        });

        roleRepository.findByName("ROLE_"+AppConstants.USER_ROLE).ifPresentOrElse(role->{
            System.out.println("User Role Already Exists: "+role.getName());
        }, ()->{

            Role role = new Role();
            role.setName("ROLE_"+AppConstants.USER_ROLE);
            role.setId(UUID.randomUUID());
            roleRepository.save(role);
        });

    }
}
