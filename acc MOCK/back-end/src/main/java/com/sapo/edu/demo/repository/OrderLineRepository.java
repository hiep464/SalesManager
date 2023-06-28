package com.sapo.edu.demo.repository;

import com.sapo.edu.demo.entities.OrderLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository

public interface OrderLineRepository extends JpaRepository<OrderLine, Integer> {
    @Query("SELECT ol.orderCode as orderCode, ol.quantity as quantity , ol.price as price , p.name as productName , pa.size  as size , pa.color as color "
            +"FROM OrderLine ol "
            +"JOIN ProductEntity  p ON ol.productCode = p.code "
            +"JOIN ProductAttribute pa ON ol.attributeID = pa.id "
            +"WHERE ol.orderCode = :code")
    List<Map<String , Object>> getOrderLineByCode(@Param("code") String code);
}
