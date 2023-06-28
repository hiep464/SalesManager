package com.sapo.edu.demo.entities;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table
@Data
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column
    String staffName;

    @Column
    String operation;

    @Column
    LocalDate historyDate;
}
