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
@RequestMapping("/admin/sales")
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
        String code;
        Integer count = orderTableService.getOrderCount();
        if(count<10){
            code = "O00"+count;
        }else if (count < 100 && count >= 10){
            code = "O0"+count;
        }else {
            code = "O"+count;
        }
        newOrder.getOrderTable().setCode(code);
        orderTableService.createOrder(newOrder.getOrderTable());
        List<OrderLine> orderLines = newOrder.getOrderLines();
        Integer i;
        for(i = 0; i < orderLines.size();i++){
            orderLines.get(i).setOrderCode(code);
        }
        return orderLineService.createOrderLine(orderLines);
    }

//    @GetMapping("/revenue")
//    public Map<String, Object> GetReport(@RequestParam String staffCode){
//        Date startDate = new Date(System.currentTimeMillis() - 10 * 24 * 60 * 60 * 1000);
//        return (Map<String, Object>) orderTableService.getReportData(staffCode,startDate);
//    }
}
