package com.sapo.edu.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;
@Data
public class SupplierDto {
    @Id
    private String code;
    @NotEmpty
    private String name;
    @NotEmpty
    private String phone;
    @NotEmpty
    private String email;
    @NotEmpty
    private String address;
    @NotEmpty
    private Long debtMoney;

}
