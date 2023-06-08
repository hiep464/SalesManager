package com.sapo.edu.demo.repository;

import com.sapo.edu.demo.entities.OrderTable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.math.BigDecimal;
import java.time.LocalDate;

@Repository
public interface OrderRepository extends JpaRepository<OrderTable, String> {

    @Query(value = "SELECT sum(total) FROM OrderTable")
    public BigDecimal total();

    @Query("SELECT SUM(o.total) FROM OrderTable o WHERE DATE(o.orderDate) = Date(:date)")
    BigDecimal findTotalRevenueByPeriod(@Param("date") LocalDate date);
}
