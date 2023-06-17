package com.sapo.edu.demo.DTO;


import com.sapo.edu.demo.entities.Order;
import com.sapo.edu.demo.entities.OrderLine;
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

    private Order orderTable;
    private List<OrderLine> orderLines;
}
