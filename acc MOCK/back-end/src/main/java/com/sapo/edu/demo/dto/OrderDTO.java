package com.sapo.edu.demo.DTO;

import com.sapo.edu.demo.entities.OrderLine;
import com.sapo.edu.demo.entities.OrderTable;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
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
