package com.sapo.edu.demo.repository;
import com.sapo.edu.demo.entities.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer> {
    List<CategoryEntity> findByCodeContaining(String code);
    Optional<CategoryEntity> findByCode(String code);
    CategoryEntity findByName(String name);
    Optional<CategoryEntity> findByNameContainingIgnoreCase(String name);



}
