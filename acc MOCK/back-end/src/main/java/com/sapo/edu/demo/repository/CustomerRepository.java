package com.sapo.edu.demo.repository;

import com.sapo.edu.demo.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
    @Modifying
    @Query("SELECT c FROM Customer c WHERE c.phone LIKE %?1%")
    List<Customer> findByPhoneNumberContaining(String phoneNumber);
}
