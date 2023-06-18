package com.sapo.edu.demo.repository;

import com.sapo.edu.demo.entities.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;

public interface CustomerRepository extends JpaRepository<Customer, String> {
    Customer findByCode(String code);

    Page<Customer> findByCodeContainingOrPhoneContainingOrNameContainingAndLastContactLessThanEqualAndLastContactGreaterThanEqualOrderByLastContactDesc(String searchText1, String searchText2, String searchText3, Date minDate, Date maxDate, Pageable pageable);
}
