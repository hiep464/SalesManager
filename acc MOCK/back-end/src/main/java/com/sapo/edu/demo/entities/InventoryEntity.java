package com.sapo.edu.demo.entities;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


import javax.persistence.*;


@Entity
@Data

@Table(name = "inventory")
public class InventoryEntity {
    @Id
    private String name;
    @Column
    @NotNull
    private String address;
}
