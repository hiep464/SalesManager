package com.sapo.edu.demo.repository;

import com.sapo.edu.demo.entities.OrderLine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderLineRepository extends JpaRepository<OrderLine, Integer> {
}
