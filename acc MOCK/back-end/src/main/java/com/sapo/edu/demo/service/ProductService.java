package com.sapo.edu.demo.service;

import com.sapo.edu.demo.dto.product.CreateProduct;
import com.sapo.edu.demo.entities.ProductEntity;
import com.sapo.edu.demo.repository.CategoryRepository;
import com.sapo.edu.demo.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class ProductService {

    private CategoryRepository categoryRepository;

    private ProductRepository productRepository;

    public void delete(String code){
        productRepository.deleteByCode(code);
    }

    public ProductService(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    public Page<ProductEntity> getAllInPage(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAll(pageable);
    }

    public ProductEntity getProductByCode(String code) {
        return productRepository.findByCode(code);
    }

    public ProductEntity saveProduct(CreateProduct p) {
        ProductEntity productEntity = new ProductEntity();
        Long count = productRepository.count();
        count = count + 1;
        String code = "P" + count.toString();
        productEntity.setCode(code);
        productEntity.setName(p.getName());
        productEntity.setBrand(p.getBrand());
        productEntity.setCategoryCode(p.getCategoryCode());
        productEntity.setCreateAt(LocalDate.now());
        productEntity.setPrice(p.getPrice());
        productEntity.setOriginalCost(p.getOriginalCost());
        productEntity.setInventoryName(p.getInventoryName());
        return productRepository.save(productEntity);
    }

    public List<Object[]> searchProductByCode(String code){
        return productRepository.findByCodeContaining(code);
    }

    public List<Object> getTop3ProductByQuantity() {
        return productRepository.findTopProductsByQuantity().subList(0, 3);
    }

    public ProductEntity updateProduct(ProductEntity productEntity){
        productEntity.setUpdateAt(LocalDate.now());
        return productRepository.save(productEntity);
    }
}

