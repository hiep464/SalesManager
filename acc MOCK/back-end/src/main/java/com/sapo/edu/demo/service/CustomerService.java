package com.sapo.edu.demo.service;

import com.sapo.edu.demo.entities.Customer;
import com.sapo.edu.demo.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> getCustomerByPhone(String Phone){
        return customerRepository.findByPhoneNumberContaining(Phone);
    }

    public Integer getCustomerCount(){ return customerRepository.getCustomerCount();}

    public Customer createCustomer(Customer customer){
        return customerRepository.save(customer);
    }
}
