package com.sapo.edu.demo.dto.product.attribute;

import lombok.Data;

@Data
public class CreateProductAttribute {

    String productCode;
    Integer quantity;
    Integer sold;
    String size;
    String color;

    public String getProductCode() {
        return productCode;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public Integer getSold() {
        return sold;
    }

    public String getSize() {
        return size;
    }

    public String getColor() {
        return color;
    }
}
