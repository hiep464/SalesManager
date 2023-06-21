package com.sapo.edu.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import javax.persistence.Id;
import java.math.BigDecimal;
@Data
public class ProductDto {
    @NotEmpty
    private String code;

    @NotEmpty
    private Integer ID;
    @NotEmpty
    private String categoryName;
    @NotEmpty
    private String name;
    @NotEmpty
    private long quantity;
    @NotEmpty
    private long sold;
    @NotEmpty
    private BigDecimal price;
    @NotEmpty
    private String size;
    @NotEmpty
    private String color;
    @NotEmpty
    private String inventoryName;
    @NotEmpty
    private String brand;
    @NotEmpty
    private BigDecimal originalCost;
    @NotEmpty
    private String image;
    @NotEmpty
    private String categoryCode;
}
