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
