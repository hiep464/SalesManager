package com.sapo.edu.demo.dto.product.attribute;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateProductAttribute {

    String productCode;
    BigDecimal price;
    BigDecimal originalCost;
    String size;
    String color;

    public String getProductCode() {
        return productCode;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public BigDecimal getOriginalCost() {
        return originalCost;
    }

    public String getSize() {
        return size;
    }

    public String getColor() {
        return color;
    }
}
