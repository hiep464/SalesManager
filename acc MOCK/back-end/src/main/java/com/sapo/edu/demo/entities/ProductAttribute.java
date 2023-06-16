package com.sapo.edu.demo.entities;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import javax.persistence.*;
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

    @Column(name = "size")
    String size;

    @Column(name = "color")
    String color;

    @Column(name = "create_at")
    LocalDate createAt;

    @Column(name = "update_at")
    LocalDate updateAt;

    public void setId(Integer id) {
        this.id = id;
    }

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

    public void setCreateAt(LocalDate createAt) {
        this.createAt = createAt;
    }

    public void setUpdateAt(LocalDate updateAt) {
        this.updateAt = updateAt;
    }
}
