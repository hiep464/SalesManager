package com.sapo.edu.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import javax.persistence.Id;
import java.time.LocalDate;
import java.util.List;

@Data
public class CheckTableDto {
    @Id
    private String code;
    @NotEmpty
    private String staffName;
    @NotEmpty
    private String status;
    @NotEmpty
    private String inventoryName;
    @NotEmpty
    private LocalDate CreateAt;
    @NotEmpty
    private List<CheckLineDto> checkLines;
}
