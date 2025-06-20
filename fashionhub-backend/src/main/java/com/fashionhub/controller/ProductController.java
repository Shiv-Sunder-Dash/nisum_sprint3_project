package com.fashionhub.controller;

import com.fashionhub.model.Product;
import com.fashionhub.service.ProductService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    private final ProductService service;
    public ProductController(ProductService service) { this.service = service; }

    @GetMapping
    public List<Product> getAllProducts() { return service.getAllProducts(); }

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam(required = false) String query,
                                        @RequestParam(required = false) Integer categoryId) {
        if (categoryId != null) {
            return service.getProductsByCategory(categoryId);
        } else if (query != null && !query.isEmpty()) {
            return service.searchProducts(query);
        }
        return service.getAllProducts();
    }
}
