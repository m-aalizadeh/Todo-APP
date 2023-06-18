package com.maryamaalizadeh.modo.controller;

import com.maryamaalizadeh.modo.dto.LoginDto;
import com.maryamaalizadeh.modo.dto.RegisterDto;
import com.maryamaalizadeh.modo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto registerDto){
        return userService.register(registerDto);
    }

    @PostMapping("/authenticate")
    public String authenticate(@RequestBody LoginDto loginDto){
        return userService.authenticate(loginDto);
    }


}
