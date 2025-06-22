package com.fashionhub.controller;

import com.fashionhub.model.Product;
import com.fashionhub.service.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import java.util.Arrays;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

@WebMvcTest(ProductController.class)
class ProductControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private ProductService service;

    @Test
    void getAllProducts_returnsList() throws Exception {
        when(service.getAllProducts()).thenReturn(Arrays.asList(new Product(), new Product()));
        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    void searchProducts_byQuery_returnsList() throws Exception {
        when(service.searchProducts("test")).thenReturn(Arrays.asList(new Product()));
        mockMvc.perform(get("/api/products/search").param("query", "test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));
    }

    @Test
    void searchProducts_byCategory_returnsList() throws Exception {
        when(service.getProductsByCategory(1)).thenReturn(Arrays.asList(new Product()));
        mockMvc.perform(get("/api/products/search").param("categoryId", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));
    }
}

