package com.officechores;

import com.officechores.model.User;
import com.officechores.model.UserRole;
import com.officechores.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@EnableScheduling
public class ChoreApplication {

    private static final Logger log = LoggerFactory.getLogger(ChoreApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(ChoreApplication.class, args);
    }

    @Bean
    CommandLineRunner seedDefaultAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.count() == 0) {
                User admin = new User(
                        "admin@example.com",
                        passwordEncoder.encode("admin123"),
                        "Admin",
                        UserRole.ADMIN
                );
                userRepository.save(admin);
                log.warn("===========================================");
                log.warn("Default admin account created:");
                log.warn("  Email:    admin@example.com");
                log.warn("  Password: admin123");
                log.warn("PLEASE CHANGE THIS PASSWORD IMMEDIATELY!");
                log.warn("===========================================");
            }
        };
    }
}
