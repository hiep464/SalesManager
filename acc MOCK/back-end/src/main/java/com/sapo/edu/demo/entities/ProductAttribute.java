package com.sapo.edu.demo.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "product_attribute")
public class ProductAttribute {

    @Id
    Integer id;

    @Column(name = "product_code")
    String productCode;

    @Column(name = "quantity")
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
