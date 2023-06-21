package com.sapo.edu.demo.entities;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

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
    private String categoryCode;

    @Column
    @NotNull
    private String name;
    @Column
    private String brand;
    @Column
    private String description;

    @Column
    private LocalDate createAt;

    @Column
    private LocalDate updateAt;


}
