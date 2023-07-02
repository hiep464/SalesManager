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
import java.time.format.DateTimeFormatter;
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

    @GetMapping("/orders")
    public List<Map<String , Object>> getAllOrders(){
        return orderService.getAllOrders();
    }
    @PostMapping("/orders")
    @Transactional
    public Order CreateNewOrder(@RequestBody OrderDTO newOrder){
        LocalDate date = LocalDate.now();
        newOrder.getOrderTable().setOrderDate(date);
        String code;
        Integer count = orderService.getOrderCount()+1;
        if(count<10){
            code = "D00"+count;
        }else if (count < 100 && count >= 10){
            code = "D0"+count;
        }else {
            code = "D"+count;
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

    @GetMapping("/order/details")
    public Map<String , Object> getOrderByCode(@RequestParam(name = "code") String code){
        return orderService.getOrderByCode(code);
    }

    @GetMapping("/orders/code")
    public List<Map<String , Object>> searchAllOrdersByCode(@RequestParam(name = "code") String code){
        return orderService.SearchAllOrdersByCode(code);
    }

    @GetMapping("/orders/staffCode")
    public List<Map<String , Object>> searchAllOrderbyStaffCode(@RequestParam(name = "code") String code,@RequestParam(name = "start") String start,@RequestParam(name = "end") String end){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate dateS = LocalDate.parse(start,formatter);
        LocalDate dateE = LocalDate.parse(end,formatter);
        return orderService.searchAllOrderbyStaffCode(code,dateS,dateE);
    }
}
