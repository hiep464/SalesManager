package com.sapo.edu.demo.repository;

import com.sapo.edu.demo.entities.Customer;
import com.sapo.edu.demo.entities.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
    Page<Feedback> findByCustomerCodeContainingOrPhoneContainingOrderByStatusAscFeedbackDateAsc(String searchText1, String searchText2, Pageable pageable);

    List<Feedback> findByCustomerCodeOrderByFeedbackDateDesc(String code);
}
