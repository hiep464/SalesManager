package com.sapo.edu.demo.repository;
import com.sapo.edu.demo.entities.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<BookingEntity, String> {
    BookingEntity findByCode(String code);
    List<BookingEntity> findByCodeContaining(String code);
    @Query("SELECT e FROM BookingEntity e WHERE (:bookingStatus IS NULL OR e.bookingStatus LIKE:bookingStatus) " +
            "AND (:supplierCode IS NULL  OR e.supplierCode LIKE :supplierCode) " +
            "AND (:inventoryName IS NULL  OR e.inventoryName LIKE :inventoryName )"  +
            "AND (:staffCode IS NULL  OR e.staffCode LIKE :staffCode )"
    )
    List<BookingEntity> findByFilters(@Param("bookingStatus") String bookingStatus,
                                      @Param("supplierCode") String supplierCode,
                                      @Param("inventoryName") String inventoryName,
                                      @Param("staffCode") String staffCode);

    @Query("SELECT e FROM BookingEntity e WHERE (:status IS NULL OR e.status LIKE:status) " +
            "AND (:bookingStatus IS NULL  OR e.bookingStatus LIKE :bookingStatus) " +
            "AND (:payStatus IS NULL  OR e.payStatus LIKE :payStatus )"  +
            "AND (:staffCode IS NULL  OR e.staffCode LIKE :staffCode )"  +
            "AND (:inventoryName IS NULL  OR e.inventoryName LIKE :inventoryName )"
    )
    List<BookingEntity> findBookingByFilters(@Param("status") String status,
                                             @Param("bookingStatus") String bookingStatus,
                                             @Param("payStatus") String payStatus,
                                             @Param("staffCode") String staffCode,
                                             @Param("inventoryName") String inventoryName);

}
