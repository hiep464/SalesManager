package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.dto.product.attribute.CreateProductAttribute;
import com.sapo.edu.demo.entities.ProductAttribute;
import com.sapo.edu.demo.service.ProductAttributeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("admin")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductAttributeController {

    @Autowired
    ProductAttributeService productAttributeService;

    @GetMapping("/product/{code}/attribute")
    public List<ProductAttribute> getAttribute(@PathVariable String code){
        return productAttributeService.findAllAttribute(code);
    }

    @DeleteMapping("/product/attribute/{id}")
    public Integer delete(@PathVariable("id") Integer id){
        productAttributeService.deleteAttribute(id);
        return id;
    }

    @PostMapping("/product/attribute/add_list")
    public List<CreateProductAttribute> addListProductAttribute(@RequestBody List<CreateProductAttribute> createProductAttributes){
        if(createProductAttributes.isEmpty())
            return null;
        return productAttributeService.addListProductAttributes(createProductAttributes);
    }

    @PutMapping("/product/attribute/update_list")
    public List<ProductAttribute> updateListProductAttribute(@RequestBody List<ProductAttribute> productAttributes){
        return productAttributeService.updateListProductAttribute(productAttributes);
    }
}
