package com.sapo.edu.demo.repository;

import com.sapo.edu.demo.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

    @Query(value = "SELECT sum(total) FROM Order")
    public BigDecimal total();

    @Query("SELECT SUM(o.total) FROM Order o WHERE DATE(o.orderDate) = Date(:date)")
    BigDecimal findTotalRevenueByPeriod(@Param("date") LocalDate date);
}
