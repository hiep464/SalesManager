package com.sapo.edu.demo.dto.product;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CreateProduct {

    String categoryCode;
    String name;
    String brand;
    BigDecimal price;
    BigDecimal originalCost;
    String inventoryName;

    public String getCategoryCode() {
        return categoryCode;
    }

    public String getName() {
        return name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public BigDecimal getOriginalCost() {
        return originalCost;
    }

    public String getBrand() {
        return brand;
    }

    public String getInventoryName() {
        return inventoryName;
    }

}
