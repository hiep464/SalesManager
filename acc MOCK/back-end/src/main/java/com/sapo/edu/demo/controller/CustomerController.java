package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.entities.Customer;
import com.sapo.edu.demo.service.CustomerService;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class CustomerController {

    CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping(value = "/customers")
    public List<Customer> seachUserByPhone(@RequestParam String phone){
        return customerService.getCustomerByPhone(phone);
    }

    @PostMapping(value="/customers")
    public  Customer createCustomer(@RequestBody Customer customer){
        Integer count = customerService.getCustomerCount() + 1;
        String code;
        customer.setLastContact(new Date());
        if(count<10){
            code = "C00"+count;
        }else if (count < 100 && count >= 10){
            code = "C0"+count;
        }else {
            code = "C"+count;
        }
        customer.setCode(code);
        return customerService.createCustomer(customer);
    }
}
