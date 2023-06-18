package com.sapo.edu.demo.repository;

import com.sapo.edu.demo.entities.OrderTable;
import com.sapo.edu.demo.entities.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Map;


@Repository
public interface OrderTableRepository extends JpaRepository<OrderTable, String> {
    @Query("SELECT SUM(o.total) AS revenue, COUNT(DISTINCT o.code) AS order_count, SUM(ol.quantity) AS product_sold "
            + "FROM OrderTable o JOIN OrderLine ol ON o.code = ol.orderCode "
            + "WHERE o.staffCode = :staffCode AND o.orderDate >= :startDate")
    Map<String, Object> getRevenueOrderCountAndProductSoldForStaffCode(@Param("staffCode") String staffCode,@Param("startDate") Date startDate);

}
