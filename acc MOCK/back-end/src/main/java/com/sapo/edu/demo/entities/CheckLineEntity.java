package com.sapo.edu.demo.entities;
import lombok.Data;


import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data

@Table(name = "check_line")
public class CheckLineEntity {
    @Id
    private String code;
    @Column
    @NotNull
    private String checkCode;
    @Column
    @NotNull
    private String productCode;
    @Column
    @NotNull
    private Long inventoryQuantity;
    @Column
    @NotNull
    private Long actualQuantity;
    @Column
    @NotNull
    private String reason;
    @Column
    @NotNull
    private String note;

}
