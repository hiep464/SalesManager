package com.sapo.edu.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import javax.persistence.Id;
import java.math.BigDecimal;
@Data
public class BookingLineDto {

    private String image;

    @Size(max = 8)
    private String bookingCode;

    private String productName;
    private String brand;
    private String category;

    private String size;

    private String color;
    private BigDecimal originalCost;


    private String inventoryName;

    private Integer quantity;

    private BigDecimal price;


}
