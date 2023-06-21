package com.sapo.edu.demo.service;

import com.sapo.edu.demo.dto.*;
import com.sapo.edu.demo.entities.*;
import com.sapo.edu.demo.repository.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.sapo.edu.demo.exception.DuplicateException;

import java.time.LocalDateTime;
import java.util.*;

import static java.time.LocalDate.now;


@Service
//@RequiredArgsConstructor
public class BookingService {
    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BookingLineRepository bookingLineRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ModelMapper modelMapperbooking;



    /**
     * Find all Bookigs
     * @return
     */
    public Map<String, Object> getAllBooking(int page, int size) {
        Pageable paging = PageRequest.of(page, size, Sort.by(
                        Sort.Order.asc("code")
                )
        );
        Page<BookingEntity> pageBooking;
        List<BookingEntity> booking = new ArrayList<BookingEntity>();
        pageBooking = bookingRepository.findAll(paging);
        booking = pageBooking.getContent();
        Map<String, Object> response = new HashMap<>();
        List<BookingDto> bookingDtos = Arrays.asList(modelMapperbooking.map(booking, BookingDto[].class));
        for(int i = 0; i < booking.size(); i++) {
            BookingDto bookDto = bookingDtos.get(i);
            BookingEntity entity = booking.get(i);
            bookDto.setStaffName(staffRepository.findById(entity.getStaffCode()).get().getName());
            bookDto.setSupplerName(supplierRepository.findById(entity.getSupplierCode()).get().getName());

        }
        response.put("products", bookingDtos);

        return response;

    }
    /**
     * Save new Booking request
     * @Param bookingDto
     * @return
     */
    public BookingDto save(BookingDto bookingDto) {
        System.out.println(bookingDto);
        BookingEntity bookingEntity = new BookingEntity();
        if(bookingDto.getCode() != null ){
            if(bookingRepository.findByCode(bookingDto.getCode()) != null) {
                System.out.println(bookingRepository.findByCode(bookingDto.getCode()).toString());
                throw  new DuplicateException("Booking code was exist");
            }else{
                //add to Booking

                bookingEntity = modelMapperbooking.map(bookingDto,BookingEntity.class);
                bookingEntity.setStaffCode(staffRepository.findByName(bookingDto.getStaffName()).getCode());
                bookingEntity.setSupplierCode(supplierRepository.findByName(bookingDto.getSupplerName()).get().getCode());
                bookingEntity.setPayStatus("Chưa thanh toán");
                bookingEntity.setBookingStatus("Chưa nhập");
                bookingEntity.setStatus("Đang giao dịch");
                bookingEntity.setBookingDate(now());




                }
                bookingEntity = bookingRepository.save(bookingEntity);

                //add to Booking line
                for(BookingLineDto bookingLineDto : bookingDto.getBookinglines()) {
                    BookingLineEntity bookingLineEntity = modelMapperbooking.map(bookingLineDto, BookingLineEntity.class);
                    bookingLineEntity.setBookingCode(bookingDto.getCode());
                    bookingLineRepository.save(bookingLineEntity);
            }

        }

        return modelMapperbooking.map(bookingEntity,BookingDto.class);
    }
    /**
     * import products to inventory
     * @Param inventoryInput
     * @return
     */
    public InventoryInputDto toInventory(InventoryInputDto inventoryInput) {
        BookingEntity bookingEntity = new BookingEntity();
        SupplierEntity supplier = new SupplierEntity();
        supplier = supplierRepository.findByCode(bookingRepository.findByCode(inventoryInput.getCode()).getSupplierCode()).get();
        if(inventoryInput.getCode() != null ){
            bookingEntity = bookingRepository.findByCode(inventoryInput.getCode());
            if(bookingEntity == null) {
                throw  new DuplicateException("Booking code not exist");
            }else{
                bookingEntity.setBookingStatus("Đã nhập");
                if(supplier.getDebtMoney().add(inventoryInput.getRemainder()).compareTo(supplier.getDebtMoney()) != 0) {
                    // Cộng nợ
                    supplier.setDebtMoney((supplier.getDebtMoney().add(inventoryInput.getRemainder())));
                    supplierRepository.save(supplier);
                    bookingEntity.setStatus("Đang giao dịch");

                } else {
                    bookingEntity.setStatus("Hoàn thành");
                    bookingEntity.setPayStatus("Đã Thanh toán");
                }
            }
        }


        bookingEntity = bookingRepository.save(bookingEntity);
        return modelMapperbooking.map(bookingEntity,InventoryInputDto.class);
    }

    public List<BookingEntity> getAll() {
        return bookingRepository.findAll();
    }
}
