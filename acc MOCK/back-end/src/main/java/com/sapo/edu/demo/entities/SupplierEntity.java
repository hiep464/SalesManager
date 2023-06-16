package com.sapo.edu.demo.entities;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import lombok.Data;


import javax.persistence.*;

import java.math.BigDecimal;



@Entity
@Data
@Table(name = "supplier")
public class SupplierEntity {
    @Id
    private String code;
    @Column
    @NotNull
    private String name;
    @Column
    @NotNull
    private String phone;
    @Column
    @NotNull
    private String email;
    @Column
    @NotNull
    private String address;
    @Column
    @NotNull
    private BigDecimal debtMoney;
}
