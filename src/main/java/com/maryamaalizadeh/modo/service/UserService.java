package com.maryamaalizadeh.modo.service;

import com.maryamaalizadeh.modo.dto.BearerToken;
import com.maryamaalizadeh.modo.dto.LoginDto;
import com.maryamaalizadeh.modo.dto.RegisterDto;
import com.maryamaalizadeh.modo.model.Role;
import com.maryamaalizadeh.modo.model.RoleName;
import com.maryamaalizadeh.modo.model.User;
import com.maryamaalizadeh.modo.repository.RoleRepository;
import com.maryamaalizadeh.modo.repository.UserRepository;
import com.maryamaalizadeh.modo.security.JwtUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtilities jwtUtilities;
    @Autowired
    private RoleRepository roleRepository;

    public Role saveRole(Role role){
        return roleRepository.save(role);
    }

    public User saveUser(User user){
        return userRepository.save(user);
    }
    public ResponseEntity<?> register(RegisterDto registerDto){
        if(userRepository.existsByEmail(registerDto.getEmail())){
            return new ResponseEntity<>("Email is already taken", HttpStatus.SEE_OTHER);
        }else {
            User user = new User();
            user.setFirstName(registerDto.getFirstName());
            user.setLastName(registerDto.getLastName());
            user.setEmail(registerDto.getEmail());
            user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
            Role role = roleRepository.findByRoleName(RoleName.USER);
            user.setRoles(Collections.singletonList(role));
            userRepository.save(user);
            String token = jwtUtilities.generateToken(registerDto.getEmail(), Collections.singletonList(role.getRoleName().toString()));
            return new ResponseEntity<>(new BearerToken(token, "Bearer "), HttpStatus.OK);
        }
    }

    public String authenticate(LoginDto loginDto){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        List<String> roleNames = new ArrayList<>();
        user.getRoles().forEach(r -> roleNames.add(r.getRoleName().toString()));
        String token = jwtUtilities.generateToken(user.getUsername(), roleNames);
        return token;
    }
}
