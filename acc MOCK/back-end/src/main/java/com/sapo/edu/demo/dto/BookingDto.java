package com.sapo.edu.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
public class BookingDto {
    @Id
    private String code;
    @NotEmpty
    private String staffName;
    @NotEmpty

    private String supplerName;
    @NotEmpty

    private BigDecimal total;
    @NotEmpty
    private Date bookingDate;
    @NotEmpty
    private List<BookingLineDto> bookinglines;





}
