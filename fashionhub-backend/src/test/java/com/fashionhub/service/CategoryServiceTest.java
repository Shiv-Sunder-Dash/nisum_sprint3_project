package com.fashionhub.service;

import com.fashionhub.model.Category;
import com.fashionhub.repository.CategoryRepository;
import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CategoryServiceTest {
    @Test
    void getAllCategories_returnsList() {
        CategoryRepository repo = mock(CategoryRepository.class);
        List<Category> categories = Arrays.asList(new Category(), new Category());
        when(repo.findAll()).thenReturn(categories);
        CategoryService service = new CategoryService(repo);
        List<Category> result = service.getAllCategories();
        assertEquals(2, result.size());
        verify(repo, times(1)).findAll();
    }
}

