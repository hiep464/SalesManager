package com.sapo.edu.demo.entities;
import lombok.Data;


import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data

@Table(name = "inventory")
public class InventoryEntity {
    @Id
    private String code;
    @Column
    @NotNull
    private String address;
}
