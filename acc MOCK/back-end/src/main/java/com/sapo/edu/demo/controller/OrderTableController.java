package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.DTO.OrderDTO;
import com.sapo.edu.demo.entities.OrderLine;
import com.sapo.edu.demo.service.OrderLineService;
import com.sapo.edu.demo.service.OrderTableService;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class OrderTableController {
    OrderTableService orderTableService;
    OrderLineService orderLineService;

    public OrderTableController(OrderTableService orderTableService,OrderLineService orderLineService) {
        this.orderTableService = orderTableService;
        this.orderLineService = orderLineService;
    }

    @PostMapping("/order/create")
    @Transactional
    public List<OrderLine> CreateNewOrder(@RequestBody OrderDTO newOrder){
        Date date = new Date();
        newOrder.getOrderTable().setOrderDate(date);
        orderTableService.createOrder(newOrder.getOrderTable());
        List<OrderLine> orderLines = newOrder.getOrderLines();
        return orderLineService.createOrderLine(orderLines);
    }

    @GetMapping("/revenue")
    public Map<String, Object> GetReport(@RequestParam String staffCode){
        Date startDate = new Date(System.currentTimeMillis() - 10 * 24 * 60 * 60 * 1000);
        return orderTableService.getReportData(staffCode,startDate);
    }
}
