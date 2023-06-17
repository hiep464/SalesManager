package com.sapo.edu.demo.repository;
import com.sapo.edu.demo.entities.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, String> {

    @Query(value = "SELECT sum(sold) FROM ProductEntity ")
    public Integer totalSold();

//    @Query(value = "SELECT sum(quantity) FROM ProductEntity ")
//    public Integer totalQuantity();

    @Query("SELECT p.name, SUM(p.sold) AS totalSold FROM ProductEntity p GROUP BY p.name ORDER BY totalSold DESC")
    List<Object> findTopProducts();

    @Query("SELECT p FROM ProductEntity p WHERE p.code = :code")
    ProductEntity findProductsByCode(String code);

    @Query("SELECT c.name, SUM(o.total) AS total "
            + "FROM Order o, Customer c  where o.customerCode = c.code "
            + "GROUP BY c.code "
            + "ORDER BY total DESC")
    List<Object> findTopCustomers();
    @Modifying
//    @Query("SELECT p FROM ProductEntity p WHERE p.code LIKE %:code% ")
    @Query("SELECT p.code , p.name, p.price, pa.id, pa.size, pa.color, pa.quantity, pa.sold " +
            "FROM ProductAttribute pa " +
            "INNER JOIN ProductEntity p ON p.code = pa.productCode " +
            "WHERE p.code LIKE %:code%")
    List<Object[]> findByCodeContaining(String code);

}

