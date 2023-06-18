package com.sapo.edu.demo.repository;

import com.sapo.edu.demo.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.Map;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

    @Query(value = "SELECT sum(total) FROM Order")
    public BigDecimal total();

//    @Query("SELECT SUM(o.total) FROM OrderTable o WHERE DATE(o.orderDate) = Date(:date)")
//    BigDecimal findTotalRevenueByPeriod(@Param("date") LocalDate date);

    @Query("SELECT SUM(o.quantity) FROM Order o")
    Integer getTotalSold();
//    @Query("SELECT SUM(o.total) FROM Order o WHERE DATE(o.orderDate) = DATE(:date) AND (o.staffCode) = :staffCode")
//    BigDecimal findTotalRevenueByStaffCode(@Param("date") LocalDate date,@Param("staffCode") String staffCode);

    @Query("SELECT SUM(o.total) AS revenue, COUNT(DISTINCT o.code) AS order_count, SUM(ol.quantity) AS product_sold "
            + "FROM Order o JOIN OrderLine ol ON o.code = ol.orderCode "
            + "WHERE o.staffCode = :staffCode AND o.orderDate >= :startDate AND o.orderDate <= :endDate")
    Map<String, Object> getRevenueOrderCountAndProductSoldForStaffCode(@Param("staffCode") String staffCode, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT COUNT(DISTINCT o.code) AS order_count FROM Order o")
    Integer getOrderCount();
}
