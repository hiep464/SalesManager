package com.sapo.edu.demo.repository;
import com.sapo.edu.demo.entities.InventoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface InventoryRepository extends JpaRepository<InventoryEntity, String> {
    Optional<InventoryEntity> findByCode(String code);

}
