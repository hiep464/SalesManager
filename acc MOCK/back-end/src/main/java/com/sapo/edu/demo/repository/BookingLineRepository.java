package com.sapo.edu.demo.repository;
import com.sapo.edu.demo.entities.BookingLineEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingLineRepository extends JpaRepository<BookingLineEntity,Long> {

    List<BookingLineEntity> findByBookingCode(String bookingCode);
}
