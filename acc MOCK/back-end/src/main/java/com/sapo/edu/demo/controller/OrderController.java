package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.DTO.OrderDTO;
import com.sapo.edu.demo.DTO.OrderLineDTO;
import com.sapo.edu.demo.entities.Order;
import com.sapo.edu.demo.entities.OrderLine;
import com.sapo.edu.demo.service.OrderLineService;
import com.sapo.edu.demo.service.OrderService;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admins")
@CrossOrigin("*")
public class OrderController {
    OrderService orderService;
    OrderLineService orderLineService;

    public OrderController(OrderService orderService, OrderLineService orderLineService) {
        this.orderService = orderService;
        this.orderLineService = orderLineService;
    }

    @PostMapping("/orders")
    @Transactional
    public Order CreateNewOrder(@RequestBody OrderDTO newOrder){
        LocalDate date = LocalDate.now();
        newOrder.getOrderTable().setOrderDate(date);
        Integer orderCount = orderService.getOrderCount();
        String Code = "O" + orderCount;
        newOrder.getOrderTable().setCode(Code);
        List<OrderLine> orderLines = newOrder.getOrderLines();
        Integer i;
        for(i = 0; i < orderLines.size();i++){
            orderLines.get(i).setOrderCode(Code);
        }
        orderService.createOrder(newOrder.getOrderTable());
        orderLineService.createOrderLine(orderLines);
        return newOrder.getOrderTable();
    }

//    @GetMapping("/revenue")
//    public Map<String, Object> GetReport(@RequestParam String staffCode){
//        Date startDate = new Date(System.currentTimeMillis() - 10 * 24 * 60 * 60 * 1000);
//        return orderService.getReportData(staffCode,startDate);
//    }
}
