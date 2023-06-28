package com.sapo.edu.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class InventoryInputDto {
    @NotEmpty
    private String code;
    @NotEmpty
    private String inventoryName;
    @NotEmpty
    private String status;
    @NotEmpty
    private String staffName;
    private String supplierName;
    private String bookingStatus;
    private BigDecimal originalCost;
    @NotEmpty
    private BigDecimal total;
    @NotEmpty
    private String payStatus;
    private LocalDate receiptDate;


    private BigDecimal remainder; //số tiền còn lại phải trả

}
