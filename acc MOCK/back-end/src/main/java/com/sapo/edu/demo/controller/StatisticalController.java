package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.service.OrderService;
import com.sapo.edu.demo.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admins/statistical")
@CrossOrigin(origins = "http://localhost:3000")
public class StatisticalController {

    OrderService orderService;
    ProductService productService;

    public StatisticalController(OrderService orderService, ProductService productService){
        this.orderService = orderService;
        this.productService = productService;
    }

    @GetMapping("/revenue")
    public BigDecimal revenue(){
        return orderService.getTotal();
    }

    @GetMapping("/sold")
    public Integer getTotalSold(){
        return productService.getTotalSold();
    }

//    @GetMapping("/quantity")
//    public Integer getTotalQuantity(){
//        return productService.getTotalQuantity();
//    }

    @GetMapping("/revenue_by_period")
    public ArrayList<BigDecimal> getTotalRevenueByPeriod(@RequestParam(name = "start date") LocalDate start, @RequestParam(name = "end date") LocalDate end){
//        LocalDate dateS = LocalDate.parse(start);
//        LocalDate dateE = LocalDate.parse(end);
        return orderService.getTotalRevenueByPeriod(start, end);
    }

    @GetMapping("/revenue_by_staff_code")
    public ArrayList<BigDecimal> getTotalRevenueByStaffCode(@RequestParam(name = "staff code") String staffCode, @RequestParam(name = "start date") String start, @RequestParam(name = "end date") String end){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate dateS = LocalDate.parse(start,formatter);
        LocalDate dateE = LocalDate.parse(end,formatter);
        return orderService.getReportData(staffCode,dateS,dateE);
    }

    @GetMapping("/top3_product")
    public List<Object> getTop3Product(){
        return productService.getTop3Product();
    }

    @GetMapping("/top3_customer")
    public List<Object> getTop3Customer(){
        return productService.getTop3Customer();
    }
}
