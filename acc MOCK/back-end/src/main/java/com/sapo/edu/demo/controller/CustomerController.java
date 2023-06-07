package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.entities.Customer;
import com.sapo.edu.demo.service.CustomerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class CustomerController {

    CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping(value = "/customer/search")
    public List<Customer> seachUserByPhone(@RequestParam String phone){
        return customerService.getCustomerByPhone(phone);
    }
}
