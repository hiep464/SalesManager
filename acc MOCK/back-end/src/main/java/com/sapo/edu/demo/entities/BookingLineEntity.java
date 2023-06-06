package com.sapo.edu.demo.entities;
import lombok.Data;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Entity
@Data

@Table(name = "booking_line")
public class BookingLineEntity {
    @Id
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
    private BigDecimal price;
}
