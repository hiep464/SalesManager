package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.entities.ProductAttribute;
import com.sapo.edu.demo.service.ProductAttributeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("admins")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductAttributeController {

    @Autowired
    ProductAttributeService productAttributeService;

    @GetMapping("/products/{code}/attribute")
    public List<ProductAttribute> getAttribute(@PathVariable String code){
        return productAttributeService.findAllAttribute(code);
    }
}