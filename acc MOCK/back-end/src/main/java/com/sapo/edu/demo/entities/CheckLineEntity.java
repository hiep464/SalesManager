package com.sapo.edu.demo.entities;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


import javax.persistence.*;


@Entity
@Data

@Table(name = "check_line")
public class CheckLineEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    @NotNull
    private String checkCode;
    @Column
    @NotNull
    private String productCode;
    @Column
    @NotNull
    private Integer inventoryQuantity;
    @Column
    @NotNull
    private Integer actualQuantity;
    @Column
    @NotNull
    private String reason;
    @Column
    @NotNull
    private Integer attributeId;

}
