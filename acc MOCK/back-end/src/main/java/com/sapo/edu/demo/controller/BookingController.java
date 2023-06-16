package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.dto.BookingDto;
import com.sapo.edu.demo.dto.CategoryDto;
import com.sapo.edu.demo.dto.InventoryInputDto;
import com.sapo.edu.demo.dto.ResponseObject;
import com.sapo.edu.demo.service.BookingService;
import com.sapo.edu.demo.service.CheckLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@Validated
@RequestMapping("admin")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @GetMapping("/booking")
    public ResponseEntity<ResponseObject> getAllCheck(
            @RequestParam(defaultValue = "0", name = "page") int page,
            @RequestParam(defaultValue = "10", name = "size") int size
    ) {
        Map<String, Object> response = bookingService.getAllBooking(page,size);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseObject("success", "", response));
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
}