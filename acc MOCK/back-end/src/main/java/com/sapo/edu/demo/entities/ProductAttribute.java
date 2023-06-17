package com.sapo.edu.demo.entities;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "product_attribute")
@Data
public class ProductAttribute {

    @Id
    Integer id;

    @Column(name = "product_code")
    @NotNull
    String productCode;

    @Column(name = "quantity")
    @NotNull
    String quantity;

    @Column(name = "sold")
    String sold;

    @Column(name = "size")
    String size;

    @Column(name = "color")
    String color;

    @Column(name = "create_at")
    String createAt;

    @Column(name = "update_at")
    String updateAt;
}