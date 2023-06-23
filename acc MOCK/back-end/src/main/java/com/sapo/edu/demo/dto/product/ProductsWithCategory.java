package com.sapo.edu.demo.dto.product;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ProductsWithCategory {
    String image;
    String code;
    String productName;
    String brand;
    String categoryName;
    String status;
    LocalDate createAt;

    public ProductsWithCategory(String image, String code, String productName, String brand, String categoryName, String status, LocalDate createAt) {
        this.image = image;
        this.code = code;
        this.productName = productName;
        this.brand = brand;
        this.categoryName = categoryName;
        this.status = status;
        this.createAt = createAt;
    }

    public String getImage() {
        return image;
    }

    public String getBrand() {
        return brand;
    }

    public String getCode() {
        return code;
    }

    public String getProductName() {
        return productName;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public LocalDate getCreateAt() {
        return createAt;
    }

    public String getStatus() {
        return status;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public void setCreateAt(LocalDate createAt) {
        this.createAt = createAt;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
