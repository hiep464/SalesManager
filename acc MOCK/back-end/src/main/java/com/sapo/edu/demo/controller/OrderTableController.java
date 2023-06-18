package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.dto.OrderDTO;
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
@RequestMapping("/admin")
@CrossOrigin("*")
public class OrderTableController {
    OrderService orderTableService;
    OrderLineService orderLineService;

    public OrderTableController(OrderService orderTableService,OrderLineService orderLineService) {
        this.orderTableService = orderTableService;
        this.orderLineService = orderLineService;
    }

    @PostMapping("/order/create")
    @Transactional
    public List<OrderLine> CreateNewOrder(@RequestBody OrderDTO newOrder){
        LocalDate date = LocalDate.now();
        newOrder.getOrderTable().setOrderDate(date);
        orderTableService.createOrder(newOrder.getOrderTable());
        List<OrderLine> orderLines = newOrder.getOrderLines();
        return orderLineService.createOrderLine(orderLines);
    }

//    @GetMapping("/revenue")
//    public Map<String, Object> GetReport(@RequestParam String staffCode){
//        Date startDate = new Date(System.currentTimeMillis() - 10 * 24 * 60 * 60 * 1000);
//        return (Map<String, Object>) orderTableService.getReportData(staffCode,startDate);
//    }
}
