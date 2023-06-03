package com.sapo.edu.demo.repository;

import com.sapo.edu.demo.entities.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
}
