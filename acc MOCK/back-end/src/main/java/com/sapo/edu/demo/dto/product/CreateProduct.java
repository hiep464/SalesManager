package com.sapo.edu.demo.dto.product;

import lombok.Data;

@Data
public class CreateProduct {

    String categoryCode;
    String name;
    String image;
    String brand;

    public String getCategoryCode() {
        return categoryCode;
    }

    public String getName() {
        return name;
    }

    public String getImage() {
        return image;
    }

    public String getBrand() {
        return brand;
    }
}
