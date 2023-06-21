package com.sapo.edu.demo.repository;

import com.sapo.edu.demo.entities.ProductAttribute;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductAttributeRepository extends JpaRepository<ProductAttribute, Integer> {

    @Query("SELECT DISTINCT p.size FROM ProductAttribute p")
    List<String> findDistinctSize();
//    @Query("select p from ProductAttribute p where p.productCode = :code")
    List<ProductAttribute> findByProductCode(String code);
    List<ProductAttribute> findDistinctByInventoryName(String inventoryName);
    List<ProductAttribute> findByProductCodeAndInventoryName(String code,String inventoryName);
    @Query("select sum(quantity) from ProductAttribute ")
    Integer getTotalQuantity();
    List<ProductAttribute> findByProductCodeIgnoreCase(String code);
    ProductAttribute findByProductCodeAndSizeAndColorAndInventoryName(String code, String size, String color, String inventoryName);

    @Query("SELECT DISTINCT p.color FROM ProductAttribute p")
    List<String> findDistinctColor();

}
