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
import java.util.List;
import java.util.Map;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

    @Query(value = "SELECT sum(total) FROM Order")
    BigDecimal total();

    @Query("SELECT o.total as total , o.quantity as quantity , o.status as status ,o.orderDate as orderDate , c.name as customerName, s.name as staffName ,s.phone as staffPhone , s.email as staffEmail, c.phone as customerPhone , c.email as customerEmail "
            +"from Order o join Customer c on o.customerCode = c.code "
            +"join Staff s on o.staffCode = s.code "
            +"WHERE o.code = :code")
    Map<String , Object> getOrderByCode(String code);
    @Query("SELECT SUM(o.total) FROM Order o WHERE DATE(o.orderDate) = Date(:date)")
    BigDecimal findTotalRevenueByPeriod(@Param("date") LocalDate date);

    @Query("SELECT SUM(o.quantity) FROM Order o")
    Integer getTotalSold();

    @Query("SELECT SUM(o.total) FROM Order o WHERE DATE(o.orderDate) = DATE(:date) AND (o.staffCode) = :staffCode")
    BigDecimal findTotalRevenueByStaffCode(@Param("date") LocalDate date,@Param("staffCode") String staffCode);

    @Query("SELECT o.staffCode AS staff_code, COUNT(DISTINCT o.code) AS order_count, SUM(ol.quantity) AS product_sold,SUM((ol.price - pa.originalCost)*ol.quantity) AS total_profit "
            + "FROM Order o JOIN OrderLine ol ON o.code = ol.orderCode "
            + "INNER JOIN ProductAttribute pa ON ol.attributeID = pa.id "
            + "WHERE o.staffCode = :staffCode AND DATE(o.orderDate) >= DATE(:startDate) AND DATE(o.orderDate) <= DATE(:endDate)")
    Map<String, Object> getRevenueOrderCountAndProductSoldForStaffCode(@Param("staffCode") String staffCode, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

//    @Query("SELECT o FROM Order o "
//            + "WHERE o.staffCode = :staffCode AND o.orderDate >= :startDate AND o.orderDate <= :endDate")
    @Query("SELECT o.code as code, o.quantity as quantity, o.total as total ,o.orderDate as order_date, c.name as name, c.phone as phone , c.email as email, o.staffCode as staff_code "
            +"FROM Order o JOIN Customer c ON o.customerCode = c.code WHERE o.staffCode = :staffCode AND o.orderDate >= :startDate AND o.orderDate <= :endDate")
    List<Map<String, Object>> getRevenueOrderForStaffCode(@Param("staffCode") String staffCode, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);


    @Query("SELECT COUNT(DISTINCT o.code) AS order_count FROM Order o")
    Integer getOrderCount();

    @Query("SELECT o.code as code, c.name as customerName, s.name as staffName, o.quantity as quantity, o.total as total, o.orderDate as orderDate, o.status as status "
            +"FROM Order o INNER JOIN Customer c ON o.customerCode = c.code "
            +"INNER JOIN Staff s ON o.staffCode = s.code")
    List<Map<String , Object>> findAllOrder();

    @Query("SELECT o.code as code, c.name as customerName, s.name as staffName, o.quantity as quantity, o.total as total, o.orderDate as orderDate, o.status as status "
            +"FROM Order o INNER JOIN Customer c ON o.customerCode = c.code "
            +"INNER JOIN Staff s ON o.staffCode = s.code "
            +"WHERE o.code LIKE %:code%")
    List<Map<String , Object>> searchAllOrderbyCode(@Param("code") String code);

    @Query("SELECT o.code as code, c.name as customerName, s.name as staffName, o.quantity as quantity, o.total as total, o.orderDate as orderDate, o.status as status "
            +"FROM Order o INNER JOIN Customer c ON o.customerCode = c.code "
            +"INNER JOIN Staff s ON o.staffCode = s.code "
            +"WHERE o.staffCode LIKE %:code% AND o.orderDate >= :start AND o.orderDate <= :end")
    List<Map<String , Object>> searchAllOrderbyStaffCode(@Param("code") String code, @Param("start") LocalDate start , @Param("end") LocalDate end);
}
