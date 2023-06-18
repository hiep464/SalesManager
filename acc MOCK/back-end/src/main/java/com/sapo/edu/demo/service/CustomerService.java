package com.sapo.edu.demo.service;

import com.sapo.edu.demo.entities.Customer;
import com.sapo.edu.demo.exception.NotFoundException;
import com.sapo.edu.demo.repository.CustomerRepository;
import com.sapo.edu.demo.response.CustumerResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class CustomerService {
    private CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Customer getCustumerByCode(String code) throws NotFoundException {
        Customer customer = customerRepository.findByCode(code);
        if (customer==null){
            throw new NotFoundException("Cann't find customer!");
        }
        else {
            return customer;
        }
    }

    public CustumerResponse updateCustomer(String code, Customer customer) {
        customer.setCode(code);
        Customer updateCustomer=customerRepository.save(customer);
        CustumerResponse custumerResponse = new CustumerResponse();
        custumerResponse.setCustomer(updateCustomer);
        custumerResponse.setMessage("Update success");
        return custumerResponse;
    }

    public CustumerResponse updateLastcontact(String code){
        Customer customer=customerRepository.findByCode(code);
        Date lastContact =new Date();
        customer.setLastContact(lastContact);
        Customer updateCustomer=customerRepository.save(customer);
        CustumerResponse custumerResponse = new CustumerResponse();
        custumerResponse.setCustomer(updateCustomer);
        custumerResponse.setMessage("Update last contact success");
        return custumerResponse;
    }

    public Page<Customer> getListCustumer(String searchText, String minDate, String maxDate, int page, int size) throws ParseException {
        Pageable pageable = PageRequest.of(page, size);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
        Date minDateConvert = dateFormat.parse(minDate);
        Date maxDateConvert = dateFormat.parse(maxDate);
        return customerRepository.findByCodeContainingOrPhoneContainingOrNameContainingAndLastContactLessThanEqualAndLastContactGreaterThanEqualOrderByLastContactDesc(searchText,searchText,searchText,minDateConvert, maxDateConvert, pageable);
    }
}
