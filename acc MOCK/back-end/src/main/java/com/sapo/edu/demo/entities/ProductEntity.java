package com.sapo.edu.demo.entities;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@Getter
@Setter
@Table(name = "product")
public class ProductEntity {
    @Id
    private String code;
    @Column
    @NotNull
    private String categoryCode;

    @Column
    @NotNull
    private String name;

    private BigDecimal price;

    @NotNull
    private String inventoryName;

    @Column
    private String brand;

    @Column(name = "original_cost")
    private BigDecimal originalCost;

    @Column
    private LocalDate createAt;

    @Column
    private LocalDate updateAt;

    public void setCode(String code) {
        this.code = code;
    }

    public void setCategoryCode(String categoryCode) {
        this.categoryCode = categoryCode;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setInventoryName(String inventoryName) {
        this.inventoryName = inventoryName;
    }

    public void setBrand(String brand) {
        this.brand = brand;
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
}
