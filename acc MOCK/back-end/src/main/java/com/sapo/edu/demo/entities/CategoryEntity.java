package com.sapo.edu.demo.entities;
import lombok.Data;


import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data

@Table(name = "category")
public class CategoryEntity {
    @Id
    private String code;
    @Column
    @NotNull
    private String name;
    @Column
    @NotNull
    private String description;
}
