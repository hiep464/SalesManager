package com.sapo.edu.demo.repository;

import com.sapo.edu.demo.entities.ProductAttribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductAttributeRepository extends JpaRepository<ProductAttribute, Integer> {

//    @Query("select p from ProductAttribute p where p.productCode = :code")
    List<ProductAttribute> findAllByProductCode(String code);

    @Query("select sum(quantity) from ProductAttribute ")
    Integer getTotalQuantity();
}
