package com.fashionhub.controller;

import com.fashionhub.model.User;
import com.fashionhub.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.util.Optional;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private UserService service;

    @Test
    void login_success() throws Exception {
        User user = new User();
        user.setEmail("a@b.com");
        user.setPassword("pass");
        when(service.login("a@b.com", "pass")).thenReturn(Optional.of(user));
        String json = "{\"email\":\"a@b.com\",\"password\":\"pass\"}";
        mockMvc.perform(post("/api/users/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk());
    }

    @Test
    void register_success() throws Exception {
        User user = new User();
        user.setEmail("a@b.com");
        when(service.register(any(User.class))).thenReturn(true);
        String json = "{\"email\":\"a@b.com\"}";
        mockMvc.perform(post("/api/users/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }
}

