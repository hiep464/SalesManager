package com.sapo.edu.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class InventoryInputDto {
    @NotEmpty
    private String code;
    @NotEmpty
    private String status;
    @NotEmpty
    private String staffName;
    @NotEmpty
    private BigDecimal total;
    @NotEmpty
    private String payStatus;
    @NotNull

    private BigDecimal remainder; //số tiền còn lại phải trả

}
