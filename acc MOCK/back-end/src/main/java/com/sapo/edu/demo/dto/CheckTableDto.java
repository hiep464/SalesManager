package com.sapo.edu.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import javax.persistence.Id;
import java.util.List;

@Data
public class CheckTableDto {
    @Id
    private String code;
    @NotEmpty
    private String staffName;

    private String status;
    @NotEmpty
    private List<CheckLineDto> checkLines;
}
