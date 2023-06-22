package com.sapo.edu.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
public class BookingDto {

    @NotEmpty
    private String code;
    @NotEmpty
    private String staffName;
    @NotEmpty

    private String supplierName;
    @NotEmpty

    private BigDecimal total;
    @NotEmpty
    private LocalDateTime bookingDate;
    @NotEmpty
    private String bookingStatus;
    @NotEmpty
    private List<BookingLineDto> bookinglines;





}
