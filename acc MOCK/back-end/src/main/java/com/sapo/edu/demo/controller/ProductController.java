package com.sapo.edu.demo.controller;
import com.sapo.edu.demo.dto.ProductDto;
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

    @PutMapping("/products/{code}")
    public ProductDto update(@PathVariable("code") String code, @Valid @RequestBody ProductDto product) {
        product.setCode(code);
        return productService.save(product);
    }

    @DeleteMapping("/products")
    public void delete(@RequestParam("code") String code) {
        productService.delete(code);
    }

    @GetMapping("/products/{code}")
    public ProductEntity getProductByCode(@PathVariable("code") String code) {
        return productService.getProductByCode(code);
    }
//
    @GetMapping("/product/search")
    public List<ProductEntity> searchProductByCode(@RequestParam String code){
        return productService.searchProductByCode(code);
    }

    @PutMapping("product/update")
    public ProductEntity updateProduct(@RequestBody ProductEntity productEntity){
        return productService.updateProduct(productEntity);
    }



//    @GetMapping("/products")
//    public ResponseEntity<ResponseObject> getAllProducts(
//            @RequestParam(defaultValue = "0", name = "page") int page,
//            @RequestParam(defaultValue = "10", name = "size") int size,
//            @RequestParam(required = false, name = "name") String name,
//            @RequestParam(required = false, name = "categoryName") String categoryName,
//            @RequestParam(required = false, name = "minCost") BigDecimal minCost,
//            @RequestParam(required = false, name = "maxCost") BigDecimal maxCost,
//            @RequestParam(required = false, name = "color") String color,
//            @RequestParam(required = false, name = "minPrice") BigDecimal minPrice,
//            @RequestParam(required = false, name = "maxPrice") BigDecimal maxPrice,
//            @RequestParam(required = false, name = "brand") String brand
//    ) {
////        Specification<ProductEntity> spec = Specifications.where(ProductSpecifications.hasColor(color))
////                .and(ProductSpecifications.hasBrand(brand));
////        Pageable pageable = PageRequest.of(page, size);
//        Map<String, Object> response = productService.getProductByFilter(page, size, name, categoryName, brand, minCost, maxCost, color, minPrice, maxPrice);
//        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseObject("success", "", response));
//    }

}