package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.service.OrderLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin/sales")
public class OrderLineController {

    @Autowired
    OrderLineService orderLineService;

    @GetMapping("/order_line")
    public List<Map<String , Object>> getOrderLineByCode(@RequestParam(name = "code") String code){
        return orderLineService.getOrderLineByCode(code);
    }
}
