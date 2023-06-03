package com.sapo.edu.demo.entities;


import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Entity
@Table(name = "order_line")
@Data
public class OrderLine {
    @Id
    @Column(name = "ID")
    private Integer id;
    @Column(name = "order_code")
    @NotNull
    @Size(max = 8)
    private String orderCode;
    @Column(name = "product_code")
    @NotNull
    @Size(max = 8)
    private String productCode;
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

    public OrderLine(String orderCode, String productCode, Integer quantity, BigDecimal price) {
        this.orderCode = orderCode;
        this.productCode = productCode;
        this.quantity = quantity;
        this.price = price;
    }
}
