package com.sapo.edu.demo.dto.category;

import lombok.Data;

@Data
public class CategoryDto {

    String name;

    String description;

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}
