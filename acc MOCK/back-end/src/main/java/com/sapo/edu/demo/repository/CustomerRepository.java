package com.sapo.edu.demo.repository;

import com.sapo.edu.demo.entities.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Date;

public interface CustomerRepository extends JpaRepository<Customer, String> {
    Customer findByCode(String code);

    Page<Customer> findByCodeContainingOrPhoneContainingOrNameContainingAndLastContactLessThanEqualAndLastContactGreaterThanEqualOrderByLastContactDesc(String searchText1, String searchText2, String searchText3, Date minDate, Date maxDate, Pageable pageable);

    @Modifying
    @Query("SELECT c FROM Customer c WHERE c.phone LIKE %?1%")
    List<Customer> findByPhoneNumberContaining(String phoneNumber);

    @Query("SELECT c.name, SUM(o.total) AS total "
            + "FROM Order o, Customer c  where o.customerCode = c.code "
            + "GROUP BY c.code "
            + "ORDER BY total DESC")
    List<Object> findTopCustomers();
    @Query("SELECT COUNT(DISTINCT c.code) AS customer_count FROM Customer c")
    Integer getCustomerCount();

}
