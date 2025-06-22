package com.fashionhub.service;

import com.fashionhub.model.Product;
import com.fashionhub.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceTest {
    @Test
    void getAllProducts_returnsList() {
        ProductRepository repo = mock(ProductRepository.class);
        List<Product> products = Arrays.asList(new Product(), new Product());
        when(repo.findAll()).thenReturn(products);
        ProductService service = new ProductService(repo);
        List<Product> result = service.getAllProducts();
        assertEquals(2, result.size());
        verify(repo, times(1)).findAll();
    }

    @Test
    void getProductsByCategory_returnsList() {
        ProductRepository repo = mock(ProductRepository.class);
        when(repo.findByCategoryCategoryId(1)).thenReturn(Arrays.asList(new Product()));
        ProductService service = new ProductService(repo);
        assertEquals(1, service.getProductsByCategory(1).size());
    }

    @Test
    void searchProducts_returnsList() {
        ProductRepository repo = mock(ProductRepository.class);
        when(repo.findByProductNameContainingIgnoreCase("test")).thenReturn(Arrays.asList(new Product()));
        ProductService service = new ProductService(repo);
        assertEquals(1, service.searchProducts("test").size());
    }
}
