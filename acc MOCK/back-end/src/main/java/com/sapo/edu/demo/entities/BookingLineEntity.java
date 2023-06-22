package com.sapo.edu.demo.entities;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;


import javax.persistence.*;

import java.math.BigDecimal;

@Entity
@Data

@Table(name = "booking_line")
public class BookingLineEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    @NotNull
    @Size(max = 8)
    private String productCode;
    @Column
    @NotNull
    private Long quantity;
    @Column
    @NotNull
    @Size(max = 8)

    private String bookingCode;
    @Column
    @NotNull
    private Integer attributeId;
    @Column
    @NotNull
    private BigDecimal price;
}
