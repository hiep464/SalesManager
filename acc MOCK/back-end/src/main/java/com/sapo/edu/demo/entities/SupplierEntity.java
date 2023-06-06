package com.sapo.edu.demo.entities;

import lombok.Data;


import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data

@Table(name = "inventory")
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
    private Long debtMoney;
}
