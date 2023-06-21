package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.dto.BookingLineDto;
import com.sapo.edu.demo.dto.ResponseObject;
import com.sapo.edu.demo.service.BookingLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Validated
@RequestMapping("admin")
@CrossOrigin(origins = "http://localhost:3000")

public class BookingLineController {
    @Autowired
    private BookingLineService bookingLineService;
    @GetMapping("/booking-line")
    public List<BookingLineDto> getAllCheckLineByCode(
            @RequestParam("code") String code
    ) {
        List<BookingLineDto> response = bookingLineService.getCheckLineByCode(code);
        return response;
    }
}
