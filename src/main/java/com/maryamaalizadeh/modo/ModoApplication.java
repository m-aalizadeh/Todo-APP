package com.maryamaalizadeh.modo;

import com.maryamaalizadeh.modo.model.Role;
import com.maryamaalizadeh.modo.model.RoleName;
import com.maryamaalizadeh.modo.model.User;
import com.maryamaalizadeh.modo.repository.RoleRepository;
import com.maryamaalizadeh.modo.repository.UserRepository;
import com.maryamaalizadeh.modo.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class ModoApplication {

	public static void main(String[] args) {
		SpringApplication.run(ModoApplication.class, args);
	}

//	@Bean
//	CommandLineRunner run (UserService userService , RoleRepository iRoleRepository , UserRepository iUserRepository , PasswordEncoder passwordEncoder)
//	{return  args ->
//	{   userService.saveRole(new Role(RoleName.USER));
//		userService.saveRole(new Role(RoleName.ADMIN));
//		userService.saveRole(new Role(RoleName.SUPERADMIN));
//		userService.saveUser(new User("admin@gmail.com", passwordEncoder.encode("adminPassword"), new ArrayList<>()));
//		userService.saveUser(new User("superadminadmin@gmail.com", passwordEncoder.encode("superadminPassword"), new ArrayList<>()));
//
//		Role role = iRoleRepository.findByRoleName(RoleName.ADMIN);
//		User user = iUserRepository.findByEmail("admin@gmail.com").orElse(null);
//		user.getRoles().add(role);
//		userService.saveUser(user);
//
//		User userr = iUserRepository.findByEmail("superadminadmin@gmail.com").orElse(null);
//		Role rolee = iRoleRepository.findByRoleName(RoleName.SUPERADMIN);
//		userr.getRoles().add(rolee);
//		userService.saveUser(userr);
//
//	};}

}
