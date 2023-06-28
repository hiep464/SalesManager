package com.sapo.edu.demo.entities;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


import javax.persistence.*;


@Entity
@Data
@Table(name = "category")
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Integer id;
    @Column
    private String code;
    @Column
    @NotNull
    private String name;
    @Column
    private String description;
}
