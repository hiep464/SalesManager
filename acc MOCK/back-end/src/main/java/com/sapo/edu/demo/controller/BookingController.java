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
@RequestMapping("admin")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @GetMapping("/bookings")
    public List<BookingDto> getAllCheck() {
        List<BookingDto> response = bookingService.getAllBooking();
        return response;
    }
//    @GetMapping("/booking")
//    public List<BookingEntity> getAllBooking(){
//        return bookingService.getAll();
//    }

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
