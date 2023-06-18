package com.sapo.edu.demo.entities;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import javax.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "order_line")
@Data
public class OrderLine {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "order_code")
    @NotNull
    @Size(max = 8)
    private String orderCode;
    @Column(name = "product_code")
    @NotNull
    @Size(max = 8)
    private String productCode;

    @Column(name = "attribute_id")
    @NotNull
    private Integer attributeID;
    @Column
    @NotNull
    private Integer quantity;
    @Column
    @NotNull
    private BigDecimal price;

    public OrderLine() {
    }

    public OrderLine(Integer id, String orderCode, String productCode, Integer quantity, BigDecimal price) {
        this.id = id;
        this.orderCode = orderCode;
        this.productCode = productCode;
        this.quantity = quantity;
        this.price = price;
    }
}
