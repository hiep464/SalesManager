package com.sapo.edu.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;

@Data
public class CheckLineDto {
    @NotEmpty

    private String productCode;
    @NotEmpty

    private Long inventoryQuantity;
    @NotEmpty

    private Long actualQuantity;
    @NotEmpty
    private String reason;


    private String note;
}
