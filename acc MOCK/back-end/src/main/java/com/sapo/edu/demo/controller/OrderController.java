package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.dto.OrderDTO;
import com.sapo.edu.demo.entities.Order;
import com.sapo.edu.demo.entities.OrderLine;
import com.sapo.edu.demo.service.OrderLineService;
import com.sapo.edu.demo.service.OrderService;
import com.sapo.edu.demo.service.ProductAttributeService;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/sales")
@CrossOrigin("*")
public class OrderController {
    OrderService orderService;
    OrderLineService orderLineService;

    ProductAttributeService productAttributeService;

    public OrderController(OrderService orderService, OrderLineService orderLineService,ProductAttributeService productAttributeService) {
        this.orderService = orderService;
        this.orderLineService = orderLineService;
        this.productAttributeService = productAttributeService;
    }

    @PostMapping("/orders")
    @Transactional
    public Order CreateNewOrder(@RequestBody OrderDTO newOrder){
        LocalDate date = LocalDate.now();
        newOrder.getOrderTable().setOrderDate(date);
        String code;
        Integer count = orderService.getOrderCount()+1;
        if(count<10){
            code = "O00"+count;
        }else if (count < 100 && count >= 10){
            code = "O0"+count;
        }else {
            code = "O"+count;
        }
        newOrder.getOrderTable().setCode(code);
        List<OrderLine> orderLines = newOrder.getOrderLines();
        Integer i;
        for(i = 0; i < orderLines.size();i++){
            orderLines.get(i).setOrderCode(code);
            productAttributeService.updateQuantity(orderLines.get(i).getAttributeID(),orderLines.get(i).getQuantity());
        }
        orderService.createOrder(newOrder.getOrderTable());
        orderLineService.createOrderLine(orderLines);
        return newOrder.getOrderTable();
    }
}
