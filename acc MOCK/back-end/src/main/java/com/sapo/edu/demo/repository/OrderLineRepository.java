package com.sapo.edu.demo.repository;

import com.sapo.edu.demo.entities.OrderLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface OrderLineRepository extends JpaRepository<OrderLine, Integer> {

}
