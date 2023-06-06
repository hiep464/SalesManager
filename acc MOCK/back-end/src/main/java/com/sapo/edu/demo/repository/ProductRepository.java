package com.sapo.edu.demo.repository;
import com.sapo.edu.demo.entities.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, String> {

    @Query(value = "SELECT sum(sold) FROM ProductEntity ")
    public Integer totalSold();

    @Query(value = "SELECT sum(quantity) FROM ProductEntity ")
    public Integer totalQuantity();

    @Query("SELECT p.name, SUM(p.sold) AS totalSold FROM ProductEntity p GROUP BY p.name ORDER BY totalSold DESC")
    List<Object> findTopProducts();

    @Query("SELECT c.name, SUM(o.total) AS total "
            + "FROM Order o, Customer c  where o.customerCode = c.code "
            + "GROUP BY c.code "
            + "ORDER BY total DESC")
    List<Object> findTopCustomers();
}

