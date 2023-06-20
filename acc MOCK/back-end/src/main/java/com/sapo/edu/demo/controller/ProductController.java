package com.sapo.edu.demo.controller;
import com.sapo.edu.demo.dto.product.CreateProduct;
import com.sapo.edu.demo.entities.ProductEntity;
import com.sapo.edu.demo.service.ProductService;

import io.swagger.annotations.ApiOperation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@Validated
@RequestMapping("admin")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    @Autowired
    private ProductService productService;

    @ApiOperation(value = "phân trang")
    @GetMapping("/products/page")
    public List<ProductEntity> getAllInPage(
            @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(name = "size", required = false, defaultValue = "5") Integer size
    ) {
        return productService.getAllInPage(page, size).getContent();
    }

    @ApiOperation(value = "lấy số trang")
    @GetMapping("categories/page_size")
    public ArrayList getPageOption(@RequestParam(name = "size", required = false, defaultValue = "5") Integer size){
        Integer pageSize =  productService.getAllInPage(0, size).getTotalPages();
        ArrayList arrayList = new ArrayList();
        for (int i = 1; i <= pageSize; i++){
            arrayList.add(i);
        }
        return arrayList;
    }

    @PostMapping("/products")
    public ProductEntity save(@Valid @RequestBody CreateProduct product) {
        return productService.saveProduct(product);
    }

    @DeleteMapping("/products")
    public void delete(@RequestParam("code") String code) {
        productService.delete(code);
    }

    @GetMapping("/products/{code}")
    public ProductEntity getProductByCode(@PathVariable("code") String code) {
        return productService.getProductByCode(code);
    }

    @GetMapping("/products")
    public List<Object[]> searchProductByCode(@RequestParam String code){
        return productService.searchProductByCode(code);
    }

    @PutMapping("product/update")
    public ProductEntity updateProduct(@RequestBody ProductEntity productEntity){
        return productService.updateProduct(productEntity);
    }

}