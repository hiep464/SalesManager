package com.sapo.edu.demo.entities;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


import javax.persistence.*;


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
}
