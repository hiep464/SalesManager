package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.dto.BookingDto;
import com.sapo.edu.demo.dto.InventoryInputDto;
import com.sapo.edu.demo.dto.ResponseObject;
import com.sapo.edu.demo.entities.BookingEntity;
import com.sapo.edu.demo.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@Validated
@RequestMapping("admin/inventory")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @GetMapping("/bookings")
    public List<BookingDto> getAllCheck() {
        List<BookingDto> response = bookingService.getAllBooking();
        return response;
    }
    @GetMapping("/booking")
    public BookingDto getBookingByCode(
            @RequestParam String code
    ){
        return bookingService.getByCode(code);
    }

    @GetMapping("/receipts_inventory")
    public List<InventoryInputDto> getAllInventoryInput() {
        List<InventoryInputDto> response = bookingService.getAllInventoryInput();
        return response;
    }
    @GetMapping("/receipt_inventory")
    public InventoryInputDto getReceiptByCode(@RequestParam String code) {
        InventoryInputDto response = bookingService.getReceiptByCode(code);
        return response;
    }
    @GetMapping("bookings/code")
    public List<BookingDto> getBookingsByCode(@RequestParam String code) {
        List<BookingDto> response = bookingService.getBookingsByCode(code);
        return response;
    }
    @GetMapping("bookings/filters")
    public List<BookingDto> getBookingsByFilters(
            @RequestParam String bookingStatus,
            @RequestParam String supplierName,
            @RequestParam String inventoryName,
            @RequestParam String staffName

    ) {
        return bookingService.getBookingsByFilters(bookingStatus, supplierName, inventoryName, staffName);
    }
    @GetMapping("receipts/filters")
    public List<InventoryInputDto> getReceiptsByFilters(
            @RequestParam String status,
            @RequestParam String bookingStatus,
            @RequestParam String payStatus,
            @RequestParam String staffName,
            @RequestParam String inventoryName

    ) {
        return bookingService.getReceiptsByFilters(status,bookingStatus, payStatus, staffName, inventoryName);
    }
    @GetMapping("bookings/receipts_inventory")
    public List<InventoryInputDto> getReceiptInventoryByCode(@RequestParam String code) {
        List<InventoryInputDto> response = bookingService.getReceiptInventoryByCode(code);
        return response;
    }

    @PostMapping("/bookings")
    public ResponseEntity<ResponseObject> save(
            @RequestBody BookingDto booking
    ) {
        bookingService.save(booking);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseObject("success", "", booking));
    }
    @PutMapping("/bookings/{code}")
    public InventoryInputDto updateBooking(
            @PathVariable String code,
            @RequestBody InventoryInputDto inventoryInputDto
    ) {
        inventoryInputDto.setCode(code);
        return bookingService.toInventory(inventoryInputDto);
    }
    @PutMapping("/booking/receipt/{code}")
    public InventoryInputDto updateBooking(
            @PathVariable String code

    ) {

        return bookingService.receiptInventory(code);
    }

    @PutMapping("/booking/pay/{code}")
    public String payBooking(
            @PathVariable String code
    ) {
        return bookingService.pay(code);
    }
    @DeleteMapping("/bookings/{code}")
    public String deleteBooking(
            @PathVariable String code
    ) {
        bookingService.deleteByCode(code);
        return "Đã xóa";
    }
}
