package com.fashionhub.service;

import com.fashionhub.model.User;
import com.fashionhub.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository repo;
    public UserService(UserRepository repo) { this.repo = repo; }

    public Optional<User> login(String email, String password) {
        return repo.findByEmailAndPassword(email, password);
    }

    public boolean register(User user) {
        if (repo.findByEmail(user.getEmail()).isPresent()) return false;
        repo.save(user);
        return true;
    }
}
