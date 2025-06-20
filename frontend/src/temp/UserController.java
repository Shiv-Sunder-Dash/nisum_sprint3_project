package com.fashionhub.controller;

import com.fashionhub.model.User;
import com.fashionhub.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService service;
    public UserController(UserService service) { this.service = service; }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return service.login(user.getEmail(), user.getPassword()).orElse(null);
    }

    @PostMapping("/register")
    public boolean register(@RequestBody User user) {
        return service.register(user);
    }
}
