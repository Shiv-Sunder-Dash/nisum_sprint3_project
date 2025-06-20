package com.fashionhub.service;

import com.fashionhub.model.Category;
import com.fashionhub.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository repo;
    public CategoryService(CategoryRepository repo) { this.repo = repo; }
    public List<Category> getAllCategories() { return repo.findAll(); }
}
