package com.sapo.edu.demo.repository;

import com.sapo.edu.demo.entities.Customer;
import com.sapo.edu.demo.entities.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
    Page<Feedback> findByCustomerCodeContainingAndFeedbackDateGreaterThanEqualAndFeedbackDateLessThanEqualAndStatusEquals(String searchText, Date minDate, Date maxDate, String status, Pageable pageable);
}
