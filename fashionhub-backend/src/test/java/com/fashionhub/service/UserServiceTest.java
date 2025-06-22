package com.fashionhub.service;

import com.fashionhub.model.User;
import com.fashionhub.repository.UserRepository;
import org.junit.jupiter.api.Test;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {
    @Test
    void login_success() {
        UserRepository repo = mock(UserRepository.class);
        User user = new User();
        when(repo.findByEmailAndPassword("a@b.com", "pass")).thenReturn(Optional.of(user));
        UserService service = new UserService(repo);
        assertTrue(service.login("a@b.com", "pass").isPresent());
    }

    @Test
    void register_success() {
        UserRepository repo = mock(UserRepository.class);
        User user = new User();
        user.setEmail("a@b.com");
        when(repo.findByEmail("a@b.com")).thenReturn(Optional.empty());
        UserService service = new UserService(repo);
        assertTrue(service.register(user));
        verify(repo, times(1)).save(user);
    }

    @Test
    void register_duplicateEmail() {
        UserRepository repo = mock(UserRepository.class);
        User user = new User();
        user.setEmail("a@b.com");
        when(repo.findByEmail("a@b.com")).thenReturn(Optional.of(user));
        UserService service = new UserService(repo);
        assertFalse(service.register(user));
        verify(repo, never()).save(user);
    }
}

