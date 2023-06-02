package com.sapo.edu.demo.repository;
import com.sapo.edu.demo.entities.InventoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<InventoryEntity, String> {
}
