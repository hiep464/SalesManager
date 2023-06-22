package com.sapo.edu.demo.entities;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;


@Entity
@Data

@Table(name = "check_table")
public class CheckTableEntity {
    @Id
    private String code;
    @Column
    @NotNull
    private String staffCode;
    @Column
    @NotNull
    private String status;
    @Column
    @NotNull
    private String inventoryName;
    @Column
    @NotNull
    private LocalDate createAt;
}
