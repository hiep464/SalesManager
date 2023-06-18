package com.sapo.edu.demo.repository;
import com.sapo.edu.demo.entities.CheckLineEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface CheckLineRepository extends JpaRepository<CheckLineEntity, Long> {

    List<CheckLineEntity> findByCheckCode(String code);

}
