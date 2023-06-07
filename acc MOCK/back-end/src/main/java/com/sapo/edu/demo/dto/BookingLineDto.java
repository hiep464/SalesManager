package com.sapo.edu.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import javax.persistence.Id;
import java.math.BigDecimal;
@Data
public class BookingLineDto {
    @NotEmpty
    private String image;
    @NotEmpty
    @Size(max = 8)
    private String bookingCode;
    @NotEmpty
    private String productName;
    @NotEmpty
    private String productCode;
    @NotEmpty
    private Long quantity;
    @NotEmpty
    private BigDecimal totalPrice;


}
