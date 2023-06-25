package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.entities.Customer;
import com.sapo.edu.demo.exception.NotFoundException;
import com.sapo.edu.demo.response.CustumerResponse;
import com.sapo.edu.demo.service.CustomerService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin/care/customers")
@CrossOrigin(origins = "*")
public class CustomerController {
    private CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/{code}")
    public Customer getCustomerByCode(@PathVariable String code) throws NotFoundException {
        Customer customer = customerService.getCustumerByCode(code);
        return customer;
    }
    @PostMapping("/{code}")
    public CustumerResponse updateCustomer(@PathVariable String code, @RequestBody Customer customer){
        return customerService.updateCustomer(code,customer);
    }

    @PostMapping("/{code}/lastcontact")
    public CustumerResponse updateLastContact(@PathVariable String code) throws ParseException {
        return customerService.updateLastcontact(code);
    }

    @GetMapping
    public Page<Customer> getListCustomer(
            @RequestParam(value = "searchText", required = false, defaultValue = "") String searchText,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "20") int size
    ) throws ParseException {
        return customerService.getListCustumer(searchText, page, size);
    }
    @GetMapping(value = "/search")
    public List<Customer> seachUserByPhone(@RequestParam String phone){
        return customerService.getCustomerByPhone(phone);

    }

    @GetMapping("/search/code")
    public List<Customer> searchCustomerByCode(@RequestParam String code){
        return customerService.getCustomerByCodeContaining(code);
    }

    @PostMapping(value="/customers")
    public  Customer createCustomer(@RequestBody Customer customer){
        Integer count = customerService.getCustomerCount() + 1;
        String code;
        Date date = new Date();
        customer.setLastContact(date);
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

    @GetMapping("/{code}/last_order")
    public List<Object> getLastOrderDateByCustomer(@PathVariable String code){
        return customerService.getLastOrderDateByCustomer(code);
    }

    @GetMapping("/{code}/total_order")
    public Optional<Object> getTotalOrderByCustomer(@PathVariable String code){
        return customerService.getTotalOrderByCustomer(code);
    }
}
