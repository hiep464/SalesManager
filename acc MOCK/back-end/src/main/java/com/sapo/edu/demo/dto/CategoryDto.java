package com.sapo.edu.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;

@Data
public class CategoryDto {
    private Integer id;
    private String code;

    @NotEmpty
    private String name;
    @NotEmpty
    private String description;
}
