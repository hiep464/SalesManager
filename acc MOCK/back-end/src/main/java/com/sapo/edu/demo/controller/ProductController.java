package com.sapo.edu.demo.controller;
import com.sapo.edu.demo.dto.ProductDto;
import com.sapo.edu.demo.dto.product.CreateProduct;
import com.sapo.edu.demo.dto.product.ProductsWithCategory;
import com.sapo.edu.demo.entities.CategoryEntity;
import com.sapo.edu.demo.entities.ProductEntity;
import com.sapo.edu.demo.service.ProductService;

import io.swagger.annotations.ApiOperation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@Validated
@RequestMapping("/admin/inventory")
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
    @GetMapping("products/page_size")
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

    @GetMapping("/products/search-products")
    public List<ProductDto> getProductsByCodeOrName(@RequestParam String searchString) {
        return productService.getProductsByCodeOrName(searchString);
    }

    @GetMapping("/products/searchString")
    public List<ProductsWithCategory> searchByCodeOrName(
            @RequestParam("text") String search

    ) {
        return productService.getProductsBySearch(search);
    }

    @GetMapping("/products/{code}")
    public ProductEntity getAllProductsByCode(
            @PathVariable("code") String code
    ) {
        return productService.getProductByCode(code);
    }
//
    @GetMapping("/product/search")
    public List<ProductDto> searchProductByStringSearchAndInventoryName(
            @RequestParam(name = "searchString", required = false) String searchString,
            @RequestParam(name = "inventoryName", required = false) String inventoryName
    ){
        return productService.searchProductBySearchStringAndInventoryName(searchString, inventoryName);
    }
    @GetMapping("/product/inventory")
    public List<ProductDto> getProductsByInventoryName(
            @RequestParam(name = "inventoryName", required = false) String inventoryName
    ){
        return productService.getAllProductByInventory(inventoryName);
    }

    @PutMapping("product/update")
    public ProductEntity updateProduct(@RequestBody ProductEntity productEntity){
        return productService.updateProduct(productEntity);
    }

    @GetMapping("/products")
    public List<ProductsWithCategory> getProductsWithCategory() {
        return productService.getProductsWithCategory();
    }

    @PostMapping("/products/filter_by_category")
    public List<ProductsWithCategory> filterByCategory(@RequestBody List<CategoryEntity> categoryEntities) {
        return productService.filterByCategory(categoryEntities);
    }

    @DeleteMapping("/products/delete/{code}")
    public String deleteProduct(@PathVariable("code") String code){
        productService.deleteProduct(code);
        return code;
    }
}