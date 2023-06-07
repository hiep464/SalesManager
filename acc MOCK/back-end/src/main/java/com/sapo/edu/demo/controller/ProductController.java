package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.entities.ProductEntity;
import com.sapo.edu.demo.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin")
public class ProductController {

    ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/product/search")
    public List<ProductEntity> getProductByCode(@RequestParam String code){
        return productService.getProductByCode(code);
    }
}
