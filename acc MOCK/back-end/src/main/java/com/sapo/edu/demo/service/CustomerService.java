package com.sapo.edu.demo.service;

import com.sapo.edu.demo.entities.Customer;
import com.sapo.edu.demo.exception.NotFoundException;
import com.sapo.edu.demo.response.CustumerResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import com.sapo.edu.demo.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public CustumerResponse updateLastcontact(String code) throws ParseException {
        Customer customer=customerRepository.findByCode(code);
        DateTimeFormatter customFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDate = customFormatter.format(LocalDateTime.now());
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date lastContact = dateFormat.parse(formattedDate);
        customer.setLastContact(lastContact);
        Customer updateCustomer=customerRepository.save(customer);
        CustumerResponse custumerResponse = new CustumerResponse();
        custumerResponse.setCustomer(updateCustomer);
        custumerResponse.setMessage("Update last contact success");
        return custumerResponse;
    }

    public Page<Customer> getListCustumer(String searchText, String minDate, String maxDate, int page, int size) throws ParseException {
        Pageable pageable = PageRequest.of(page, size);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date minDateConvert = dateFormat.parse(minDate);
        Date maxDateConvert = dateFormat.parse(maxDate);
        return customerRepository.findByCodeContainingOrPhoneContainingOrNameContainingAndLastContactLessThanEqualAndLastContactGreaterThanEqualOrderByLastContactAsc(searchText, searchText, searchText, minDateConvert, maxDateConvert, pageable);
    }
    public List<Customer> getCustomerByPhone(String Phone){
        return customerRepository.findByPhoneNumberContaining(Phone);
    }
    public List<Customer> getCustomerByCodeContaining(String code){
        return customerRepository.findByCodeContaining(code);
    }

    public List<Object> getTop3Customer(){
        return customerRepository.findTopCustomers().subList(0, 3);}
    public Integer getCustomerCount(){ return customerRepository.getCustomerCount();}

    public Customer createCustomer(Customer customer){
        return customerRepository.save(customer);
    }
}
