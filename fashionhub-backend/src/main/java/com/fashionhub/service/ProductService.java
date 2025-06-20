package com.fashionhub.service;

import com.fashionhub.model.Product;
import com.fashionhub.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {
    private final ProductRepository repo;
    public ProductService(ProductRepository repo) { this.repo = repo; }

    public List<Product> getAllProducts() { return repo.findAll(); }
    public List<Product> getProductsByCategory(Integer categoryId) { return repo.findByCategoryCategoryId(categoryId); }
    public List<Product> searchProducts(String query) { return repo.findByProductNameContainingIgnoreCase(query); }
}
