package com.sapo.edu.demo.entities;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "product_attribute")
@Data
public class ProductAttribute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(name = "product_code")
    @NotNull
    String productCode;

    @Column(name = "quantity")
    @NotNull
    Integer quantity;

    @Column(name = "sold")
    Integer sold;

    @Column
    private String image;

    @Column(name = "size")
    String size;

    @Column
    String color;

    @Column
    @NotNull
    private String status;

    @Column(name = "original_cost")
    BigDecimal originalCost;

    @Column(name = "price")
    BigDecimal price;

    @Column(name = "inventory_name")
    String inventoryName;

    @Column(name = "create_at")
    LocalDate createAt;

    @Column(name = "update_at")
    LocalDate updateAt;


    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void setSold(Integer sold) {
        this.sold = sold;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setOriginalCost(BigDecimal originalCost) {
        this.originalCost = originalCost;
    }

    public void setCreateAt(LocalDate createAt) {
        this.createAt = createAt;
    }

    public void setUpdateAt(LocalDate updateAt) {
        this.updateAt = updateAt;
    }


    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getInventoryName() {
        return inventoryName;
    }

    public void setInventoryName(String inventoryName) {
        this.inventoryName = inventoryName;
    }
}
