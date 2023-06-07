package com.sapo.edu.demo.repository;
import com.sapo.edu.demo.entities.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, String> {
    Optional<ProductEntity> findByCodeIgnoreCase(String code);
    Optional<ProductEntity> findProductCodeByCode(String code);
    Optional<ProductEntity> findByBrandContainingIgnoreCase(String code);

    Optional<ProductEntity> deleteAllByInventoryName(String inventoryName);
    Optional<ProductEntity> deleteByCode(String code);



    @Query("SELECT e FROM ProductEntity e WHERE (:name IS NULL OR LOWER(e.name) LIKE LOWER(CONCAT('%', :name, '%') )) " +
            "AND (:categoryCode IS NULL  OR e.categoryCode LIKE :categoryCode) " +
            "AND (:brand IS NULL  OR e.brand LIKE :brand )" +
            "AND (:minOriginalCost IS NULL OR :maxOriginalCost IS NULL OR e.originalCost BETWEEN :minOriginalCost AND :maxOriginalCost) " +
            "AND (:color IS NULL  OR e.color LIKE :color )" +
            "AND (:minPrice IS NULL OR :maxPrice IS NULL OR e.price BETWEEN :minPrice AND :maxPrice) "
    )

    Page<ProductEntity> findByFilters(@Param("name") String name,
                                      @Param("categoryCode") String categoryCode,
                                      @Param("brand") String brand,
                                      @Param("minOriginalCost") BigDecimal minOriginalCost,
                                      @Param("maxOriginalCost") BigDecimal maxOriginalCost,
                                      @Param("color") String color,
                                      @Param("minPrice") BigDecimal minPrice,
                                      @Param("maxPrice") BigDecimal maxPrice,
                                      Pageable pageable);

}
