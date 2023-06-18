package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.entities.Customer;
import com.sapo.edu.demo.exception.NotFoundException;
import com.sapo.edu.demo.response.CustumerResponse;
import com.sapo.edu.demo.service.CustomerService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/admin/customers")
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
    public CustumerResponse updateLastContact(@PathVariable String code){
        return customerService.updateLastcontact(code);
    }

    @GetMapping
    public Page<Customer> getListCustomer(
            @RequestParam(value = "searchText", required = false, defaultValue = "") String searchText,
            @RequestParam(value = "minDate", required = false, defaultValue ="2010-06-07T01:58:07.000+0000")String minDate,
            @RequestParam(value = "maxDate", required = false, defaultValue = "2023-06-07T01:58:07.000+0000")String maxDate,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "20") int size
    ) throws ParseException {
        return customerService.getListCustumer(searchText, minDate, maxDate, page, size);
    }
    @GetMapping(value = "/search")
    public List<Customer> seachUserByPhone(@RequestParam String phone){
        return customerService.getCustomerByPhone(phone);

    }
}
