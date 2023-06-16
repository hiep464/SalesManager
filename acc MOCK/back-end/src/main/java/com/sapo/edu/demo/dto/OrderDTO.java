package com.sapo.edu.demo.dto;

import com.sapo.edu.demo.entities.OrderLine;
import com.sapo.edu.demo.entities.OrderTable;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderDTO {
//    private String code;
//    private String staffCode;
//    private String CustomerCode;
//    private BigDecimal total;
//    private Date orderDate;
//    private String status;

    private OrderTable orderTable;
    private List<OrderLine> orderLines;
}
