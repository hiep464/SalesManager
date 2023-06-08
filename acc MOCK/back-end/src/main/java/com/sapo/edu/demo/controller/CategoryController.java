package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.dto.CategoryDto;
import com.sapo.edu.demo.dto.ResponseObject;
import com.sapo.edu.demo.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@RestController
@Validated
@RequestMapping("admin")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @PostMapping("/categories")
    public ResponseEntity<ResponseObject> save(@RequestBody CategoryDto category) {
        categoryService.save(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseObject("success", "", category));
    }
    @GetMapping("/categories")
    public ResponseEntity<ResponseObject> getAllProducts() {
        Map<String, Object> response = categoryService.getAllCategories();
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseObject("success", "", response));
    }
    @GetMapping("/categories/filter")
    public ResponseEntity<ResponseObject> getCategoriesByCode(@RequestParam("code") String code) {
        Map<String, Object> response = categoryService.getCategoriesByCode(code);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseObject("success", "", response));

    }
}
