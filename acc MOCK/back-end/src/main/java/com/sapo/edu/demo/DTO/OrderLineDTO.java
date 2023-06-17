package com.sapo.edu.demo.DTO;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class OrderLineDTO {

    private String orderCode;
    private String productCode;
    private Integer quantity;
    private Integer attributeID;

    private BigDecimal price;
}
