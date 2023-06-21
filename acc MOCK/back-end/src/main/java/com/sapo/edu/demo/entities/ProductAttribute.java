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
    @Column
    @NotNull
    private String image;
    @Column(name = "quantity")
    @NotNull
    Integer quantity;

    @Column(name = "sold")
    Integer sold;

    @Column
    String size;

    @Column
    String color;
    @Column
    @NotNull
    private BigDecimal originalCost;
    @Column
    @NotNull
    private BigDecimal price;
    @Column
    @NotNull
    private String inventoryName;
    @Column
    @NotNull
    private String status;

    @Column(name = "create_at")
    LocalDate createAt;

    @Column(name = "update_at")
    LocalDate updateAt;


}
