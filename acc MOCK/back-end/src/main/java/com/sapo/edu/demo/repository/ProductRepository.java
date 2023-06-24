package com.sapo.edu.demo.repository;
import com.sapo.edu.demo.dto.product.ProductsWithCategory;
import com.sapo.edu.demo.entities.CategoryEntity;
import com.sapo.edu.demo.entities.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import java.math.BigDecimal;
import org.springframework.data.jpa.repository.Modifying;


import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, String> {
    Optional<ProductEntity> findByCodeIgnoreCase(String code);
    Optional<ProductEntity> findProductCodeByCode(String code);
    Optional<ProductEntity> findByBrandContainingIgnoreCase(String code);
    ProductEntity findByName(String name);

    Optional<ProductEntity> deleteByCode(String code);

    @Query("SELECT new com.sapo.edu.demo.dto.product.ProductsWithCategory(p.image, p.code, p.name, p.brand, c.name, p.createAt) " +
            "FROM ProductEntity p LEFT JOIN CategoryEntity c on p.categoryCode = c.code " +
            "WHERE p.name LIKE %:keyword% OR p.code LIKE %:keyword%")
    List<ProductsWithCategory> findByCodeContainingOrNameContaining(@Param("keyword") String keyword);

    ProductEntity findByCode(String code);


    @Modifying
    @Query("SELECT p FROM ProductEntity p WHERE p.code LIKE %:code% ")
    List<ProductEntity> findByCodeContaining(String code);


    @Query("select p.name, sum(pa.quantity) as total "
            + "from ProductEntity p join ProductAttribute pa on p.code = pa.productCode "
            + "group by p.code order by total desc")
    List<Object> findTopProductsByQuantity();

    @Query("SELECT new com.sapo.edu.demo.dto.product.ProductsWithCategory(p.image, p.code, p.name, p.brand, c.name, p.createAt) " +
            "FROM ProductEntity p LEFT JOIN CategoryEntity c on p.categoryCode = c.code")
    List<ProductsWithCategory> getProductsWithCategory();

    @Query("SELECT new com.sapo.edu.demo.dto.product.ProductsWithCategory(p.image, p.code, p.name, p.brand, c.name, p.createAt)  " +
            "FROM ProductEntity p LEFT JOIN CategoryEntity c on p.categoryCode = c.code " +
            "WHERE c IN :categories")
    List<ProductsWithCategory> findByCategoryIn(List<CategoryEntity> categories);
}
