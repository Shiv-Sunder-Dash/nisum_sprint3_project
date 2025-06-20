package com.fashionhub.repository;

import com.fashionhub.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, String> {
    List<Product> findByProductNameContainingIgnoreCase(String query);
    List<Product> findByCategoryCategoryId(Integer categoryId);
}
