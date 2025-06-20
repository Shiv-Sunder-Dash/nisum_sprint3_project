package com.fashionhub.controller;

import com.fashionhub.model.Category;
import com.fashionhub.service.CategoryService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {
    private final CategoryService service;
    public CategoryController(CategoryService service) { this.service = service; }

    @GetMapping
    public List<Category> getAllCategories() { return service.getAllCategories(); }
}
