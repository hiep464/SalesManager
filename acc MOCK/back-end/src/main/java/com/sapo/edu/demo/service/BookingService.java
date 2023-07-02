package com.sapo.edu.demo.service;

import com.sapo.edu.demo.dto.*;
import com.sapo.edu.demo.entities.*;
import com.sapo.edu.demo.exception.NotFoundException;
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
import org.springframework.web.bind.annotation.PutMapping;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

import static java.time.LocalDate.now;


@Service
//@RequiredArgsConstructor
public class BookingService {
    @Autowired
    private StaffRepository staffRepository;
    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductAttributeRepository productAttributeRepository;

    @Autowired
    private BookingLineRepository bookingLineRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ModelMapper modelMapperbooking;

    public BookingDto getByCode(String code) {
        BookingEntity bookingEntity = bookingRepository.findByCode(code);
        BookingDto dto = new BookingDto();
        dto =  modelMapperbooking.map(bookingEntity,BookingDto.class);
        dto.setStaffName(staffRepository.findById(bookingEntity.getStaffCode()).get().getName());
        dto.setSupplierName(supplierRepository.findById(bookingEntity.getSupplierCode()).get().getName());
        return dto;

    }

    public List<BookingDto> getBookingsByCode (String code) {
        List<BookingEntity> bookingEntity = bookingRepository.findByCodeContaining(code);
        List<BookingDto> bookingDtos = Arrays.asList(modelMapperbooking.map(bookingEntity, BookingDto[].class));
        for(int i = 0; i < bookingEntity.size(); i++) {
            BookingDto bookDto = bookingDtos.get(i);
            BookingEntity entity = bookingEntity.get(i);
            bookDto.setStaffName(staffRepository.findById(entity.getStaffCode()).get().getName());
            bookDto.setSupplierName(supplierRepository.findById(entity.getSupplierCode()).get().getName());

        }


        return bookingDtos;
    }
    public List<InventoryInputDto> getReceiptInventoryByCode (String code) {
        List<BookingEntity> bookingEntity = bookingRepository.findByCodeContaining(code);
        List<InventoryInputDto> bookingDtos = Arrays.asList(modelMapperbooking.map(bookingEntity, InventoryInputDto[].class));
        for(int i = 0; i < bookingEntity.size(); i++) {
            InventoryInputDto bookDto = bookingDtos.get(i);
            BookingEntity entity = bookingEntity.get(i);
            bookDto.setStaffName(staffRepository.findById(entity.getStaffCode()).get().getName());
            bookDto.setSupplierName(supplierRepository.findById(entity.getSupplierCode()).get().getName());

        }


        return bookingDtos;
    }



    /**
     * Find all Bookigs
     * @return
     */
    public List<BookingDto> getAllBooking() {

        List<BookingEntity> booking = new ArrayList<BookingEntity>();
        booking = bookingRepository.findAll();

        List<BookingDto> bookingDtos = Arrays.asList(modelMapperbooking.map(booking, BookingDto[].class));
        for(int i = 0; i < booking.size(); i++) {
            BookingDto bookDto = bookingDtos.get(i);
            BookingEntity entity = booking.get(i);
            bookDto.setStaffName(staffRepository.findById(entity.getStaffCode()).get().getName());
            bookDto.setSupplierName(supplierRepository.findById(entity.getSupplierCode()).get().getName());

        }


        return bookingDtos;

    }

    public List<BookingDto> getBookingsByFilters (String bookingStatus, String supplierName, String inventoryName, String staffName) {

        String filterSupplier = null;
        String filterInventory = null;
        String filterStaff = null;
        String filterStatus = null;
        if (bookingStatus != "") {

            filterStatus = bookingStatus;

        }
        if(supplierName != null) {
            Optional<SupplierEntity>  supplier = supplierRepository.findByName(supplierName);
            if(supplier.isPresent()) {
                filterSupplier = supplier.get().getCode();
            }
        }
        if(inventoryName != null) {
            Optional<InventoryEntity> inventory = inventoryRepository.findById(inventoryName);
            if(inventory.isPresent()) {
                filterInventory = inventory.get().getName();
            }
        }
        if(staffName!= null) {
            Staff staff = staffRepository.findByName(staffName);
            if(staff != null) {
                filterStaff = staff.getCode();
            }

        }


        List<BookingEntity> bookingEntities = bookingRepository.findByFilters(filterStatus, filterSupplier, filterInventory, filterStaff);
        List<BookingDto> bookingDtos = Arrays.asList(modelMapperbooking.map(bookingEntities, BookingDto[].class));
        for(int i = 0; i < bookingEntities.size(); i++) {
            BookingDto bookDto = bookingDtos.get(i);
            BookingEntity entity = bookingEntities.get(i);
            bookDto.setStaffName(staffRepository.findById(entity.getStaffCode()).get().getName());
            bookDto.setSupplierName(supplierRepository.findById(entity.getSupplierCode()).get().getName());
        }
        return bookingDtos;
    }
    public List<InventoryInputDto> getReceiptsByFilters (String status, String bookingStatus, String payStatus, String staffName,String inventoryName) {

        String filterStatus = null;
        String filterBookingStatus = null;
        String filterStaff = null;
        String filterPayStatus = null;
        String filterInventory = null;

        if (status != "") {

            filterStatus = status;

        }
        if (bookingStatus != "") {

            filterBookingStatus = bookingStatus;

        }
        if (payStatus != "") {

            filterPayStatus = payStatus;

        }

        if(inventoryName != null) {
            Optional<InventoryEntity> inventory = inventoryRepository.findById(inventoryName);
            if(inventory.isPresent()) {
                filterInventory = inventory.get().getName();
            }
        }
        if(staffName!= null) {
            Staff staff = staffRepository.findByName(staffName);
            if(staff != null) {
                filterStaff = staff.getCode();
            }

        }


        List<BookingEntity> bookingEntities = bookingRepository.findBookingByFilters(filterStatus, filterBookingStatus, filterPayStatus, filterStaff,filterInventory);
        List<InventoryInputDto> bookingDtos = Arrays.asList(modelMapperbooking.map(bookingEntities, InventoryInputDto[].class));
        for(int i = 0; i < bookingEntities.size(); i++) {
            InventoryInputDto bookDto = bookingDtos.get(i);
            BookingEntity entity = bookingEntities.get(i);
            bookDto.setStaffName(staffRepository.findById(entity.getStaffCode()).get().getName());
            bookDto.setSupplierName(supplierRepository.findById(entity.getSupplierCode()).get().getName());
        }
        return bookingDtos;
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
                throw  new DuplicateException("Mã đặt hàng bị trùng lặp");
            }else{
                //add to Booking

                bookingEntity = modelMapperbooking.map(bookingDto,BookingEntity.class);
                bookingEntity.setStaffCode(staffRepository.findByName(bookingDto.getStaffName()).getCode());
                bookingEntity.setSupplierCode(supplierRepository.findByName(bookingDto.getSupplierName()).get().getCode());
                bookingEntity.setPayStatus("Chưa thanh toán");
                bookingEntity.setBookingStatus("Chưa nhập");
                bookingEntity.setStatus("Đang giao dịch");
                }
                bookingEntity = bookingRepository.save(bookingEntity);

                //add to Booking line
                for(BookingLineDto bookingLineDto : bookingDto.getBookinglines()) {
                    BookingLineEntity bookingLineEntity = modelMapperbooking.map(bookingLineDto, BookingLineEntity.class);
                    ProductEntity entity = productRepository.findByName(bookingLineDto.getProductName());
                    bookingLineEntity.setProductCode(entity.getCode());
                    ProductAttribute attribute = productAttributeRepository.findByProductCodeAndSizeAndColorAndInventoryName(entity.getCode(),bookingLineDto.getSize(),bookingLineDto.getColor(),bookingDto.getInventoryName());
                    bookingLineEntity.setBookingCode(bookingDto.getCode());
                    if(attribute != null) {
                        bookingLineEntity.setAttributeId(attribute.getId());
                    } else {
                        ProductAttribute newAttribute = new ProductAttribute();
                        newAttribute.setProductCode(entity.getCode());
                        newAttribute.setSize(bookingLineDto.getSize());
                        newAttribute.setColor(bookingLineDto.getColor());
                        newAttribute.setInventoryName(bookingDto.getInventoryName());
                        newAttribute.setQuantity(0);
                        newAttribute.setPrice(BigDecimal.valueOf(0));
                        newAttribute.setSold(0);
                        newAttribute = productAttributeRepository.save(newAttribute);
                        bookingLineEntity.setAttributeId(newAttribute.getId());
                    }
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
                throw  new NotFoundException("Booking code not exist");
            }else{
                bookingEntity.setBookingStatus("Đã nhập");
                if(supplier.getDebtMoney().add(inventoryInput.getRemainder()).compareTo(supplier.getDebtMoney()) != 0) {
                    // Cộng nợ
                    supplier.setDebtMoney((supplier.getDebtMoney().add(inventoryInput.getRemainder())));
                    supplierRepository.save(supplier);
                    bookingEntity.setStatus("Đang giao dịch");

                } else {
                    bookingEntity.setStatus("Hoàn thành");
                    bookingEntity.setPayStatus("Đã thanh toán");
                }
            }
            List<BookingLineEntity> bookinglines = bookingLineRepository.findByBookingCode(bookingEntity.getCode());
            for(BookingLineEntity bookingLine : bookinglines) {
                ProductAttribute attribute = productAttributeRepository.findById(bookingLine.getAttributeId()).get();
                attribute.setQuantity(bookingLine.getQuantity());
                attribute.setOriginalCost(bookingLine.getOriginalCost());
                productAttributeRepository.save(attribute);
            }


        }


        bookingEntity = bookingRepository.save(bookingEntity);
        return modelMapperbooking.map(bookingEntity,InventoryInputDto.class);
    }

    public InventoryInputDto receiptInventory(String code) {
        BookingEntity bookingEntity = new BookingEntity();

        if(code != null ){
            bookingEntity = bookingRepository.findByCode(code);
            System.out.println(bookingEntity);
            if(bookingEntity == null) {
                throw  new NotFoundException("Không tìm thấy mã nhập hàng với mã : " + code);
            }else{
                SupplierEntity supplier = new SupplierEntity();
                supplier = supplierRepository.findByCode(bookingRepository.findByCode(code).getSupplierCode()).get();
                System.out.println(supplier);
                bookingEntity.setBookingStatus("Đã nhập");
                if (bookingEntity.getPayStatus().equals("Chưa thanh toán")) {

                    supplier.setDebtMoney(supplier.getDebtMoney().add(bookingEntity.getTotal()));
                    System.out.println(supplier.getDebtMoney());
                    bookingEntity.setStatus("Đang giao dịch");
                } else {
                    bookingEntity.setStatus("Hoàn thành");

                }
                    // Cộng nợ
                supplierRepository.save(supplier);
                bookingEntity.setReceiptDate(now());


            }
            List<BookingLineEntity> bookinglines = bookingLineRepository.findByBookingCode(bookingEntity.getCode());
            for(BookingLineEntity bookingLine : bookinglines) {
                ProductAttribute attribute = productAttributeRepository.findById(bookingLine.getAttributeId()).get();
                attribute.setQuantity(bookingLine.getQuantity());
                attribute.setOriginalCost(bookingLine.getOriginalCost());
                productAttributeRepository.save(attribute);
            }


        }


        bookingEntity = bookingRepository.save(bookingEntity);
        return modelMapperbooking.map(bookingEntity,InventoryInputDto.class);
    }

    public String pay(String code) {
        BookingEntity bookingEntity = bookingRepository.findByCode(code);
        SupplierEntity supplierEntity = supplierRepository.findById(bookingEntity.getSupplierCode()).get();
        if(bookingEntity == null) {
            throw  new NotFoundException("Không tìm thấy mã nhập hàng với mã : \" + code");
        }else{
            if(bookingEntity.getBookingStatus().equals("Đã nhập")) {
                supplierEntity.setDebtMoney(supplierEntity.getDebtMoney().subtract(bookingEntity.getTotal()));
                bookingEntity.setStatus("Hoàn thành");
            }
            bookingEntity.setPayStatus("Đã thanh toán");
        }
        List<BookingLineEntity> lines = bookingLineRepository.findByBookingCode(code);
        for(BookingLineEntity bookingLine : lines) {
            ProductAttribute attribute = productAttributeRepository.findById(bookingLine.getAttributeId()).get();
            attribute.setQuantity(bookingLine.getQuantity());
            attribute.setOriginalCost(bookingLine.getOriginalCost());
            productAttributeRepository.save(attribute);
        }


        supplierRepository.save(supplierEntity);
        bookingRepository.save(bookingEntity);
        return "success";
    }
    public List<InventoryInputDto> getAllInventoryInput() {
        List<BookingEntity> booking = new ArrayList<BookingEntity>();
        booking = bookingRepository.findAll();
        List<InventoryInputDto> inventoryInputDtos = new ArrayList<>();
        inventoryInputDtos = Arrays.asList(modelMapperbooking.map(booking, InventoryInputDto[].class));
        for(int i = 0; i < booking.size(); i++) {
            InventoryInputDto inventoryInputDto = inventoryInputDtos.get(i);
            BookingEntity entity = booking.get(i);
            inventoryInputDto.setStaffName(staffRepository.findById(entity.getStaffCode()).get().getName());
            inventoryInputDto.setSupplierName(supplierRepository.findById(entity.getSupplierCode()).get().getName());   ;
        }
        return inventoryInputDtos;
    }
    public InventoryInputDto getReceiptByCode(String code) {
        BookingEntity bookingEntity = bookingRepository.findByCode(code);
        InventoryInputDto dto = new InventoryInputDto();
        dto =  modelMapperbooking.map(bookingEntity,InventoryInputDto.class);
        dto.setStaffName(staffRepository.findById(bookingEntity.getStaffCode()).get().getName());
        dto.setSupplierName(supplierRepository.findById(bookingEntity.getSupplierCode()).get().getName());
        return dto;

    }

    public List<BookingEntity> getAll() {
        return bookingRepository.findAll();
    }
    public void deleteByCode(String code) {bookingRepository.deleteById(code);}


}
