package com.sapo.edu.demo.entities;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

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
    private String name;
    @Column
    @NotNull
    private long quantity;
    @Column
    @NotNull
    private long sold;
    @Column
    @NotNull
    private BigDecimal price;
    @Column
    @NotNull
    private String size;
    @Column
    @NotNull
    private String color;
    @Column
    @NotNull
    private String inventory_name;


}
