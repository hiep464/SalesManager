package com.sapo.edu.demo.entities;
import jakarta.validation.constraints.*;
import lombok.Data;


import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import javax.persistence.Entity;


import java.util.Date;

@Entity
@Data

@Table(name = "booking")
public class BookingEntity {
    @Id
    private String code;
    @Column
    @NotNull
    @Size(max = 8)
    private String staffCode;
    @Column
    @NotNull
    @Size(max = 8)
    private String supplierCode;
    @Column
    private BigDecimal total;
    @Column
    private LocalDate bookingDate;
    @Column
    private LocalDate receiptDate;
    @Column
    @NotNull
    @Size(max =50)
    private String payStatus;
    @Column
    @NotNull
    @Size(max = 50)
    private String bookingStatus;
    @Column
    @NotNull
    @Size(max = 50)
    private String status;
    @Column
    @NotNull
    @Size(max = 100)
    private String inventoryName;


}
