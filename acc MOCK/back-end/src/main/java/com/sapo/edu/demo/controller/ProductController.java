package com.sapo.edu.demo.controller;


import com.sapo.edu.demo.dto.ProductDto;
import com.sapo.edu.demo.entities.ProductEntity;
import com.sapo.edu.demo.service.ProductService;
import com.sapo.edu.demo.dto.ResponseObject;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.Map;

@RestController
@Validated
@RequestMapping("admin")
@CrossOrigin(origins = "http://localhost:3000")

public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping("/products")
    public ProductDto save(@Valid @RequestBody ProductDto product) {
        return productService.save(product);
    }

    @PutMapping("/products/{code}")
    public ProductDto update(@PathVariable("code") String code, @Valid @RequestBody ProductDto product) {
        product.setCode(code);
        return productService.save(product);
    }

    @DeleteMapping("/products")
    public void delete(@RequestParam("code") String code) {
        productService.delete(code);
    }

    @GetMapping("/products/{id}")
    public ProductDto getProductByCode(@PathVariable("code") String code) {
        ProductDto product = productService.findByCode(code);
        return product;
    }

    @GetMapping("/products")
    public ResponseEntity<ResponseObject> getAllProducts(
            @RequestParam(defaultValue = "0", name = "page") int page,
            @RequestParam(defaultValue = "10", name = "size") int size,
            @RequestParam(required = false, name = "name") String name,
            @RequestParam(required = false, name = "code") String code,
            @RequestParam(required = false, name = "categoryName") String categoryName,
            @RequestParam(required = false, name = "minCost") BigDecimal minCost,
            @RequestParam(required = false, name = "maxCost") BigDecimal maxCost,
            @RequestParam(required = false, name = "color") String color,
            @RequestParam(required = false, name = "minPrice") BigDecimal minPrice,
            @RequestParam(required = false, name = "maxPrice") BigDecimal maxPrice,
            @RequestParam(required = false, name = "brand") String brand
    ) {
//        Specification<ProductEntity> spec = Specifications.where(ProductSpecifications.hasColor(color))
//                .and(ProductSpecifications.hasBrand(brand));
//        Pageable pageable = PageRequest.of(page, size);
        Map<String, Object> response = productService.getProductByFilter(page, size, name,code, categoryName, brand, minCost, maxCost, color, minPrice, maxPrice);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseObject("success", "", response));
    }
}