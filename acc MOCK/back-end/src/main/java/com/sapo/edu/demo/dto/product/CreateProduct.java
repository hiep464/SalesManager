package com.sapo.edu.demo.dto.product;

import lombok.Data;

@Data
public class CreateProduct {

    Integer categoryId;
    String name;
    String image;
    String brand;
    String description;



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
