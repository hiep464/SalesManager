package com.sapo.edu.demo.service;

import com.sapo.edu.demo.dto.BookingLineDto;
import com.sapo.edu.demo.dto.CheckLineDto;
import com.sapo.edu.demo.entities.BookingLineEntity;
import com.sapo.edu.demo.entities.CheckLineEntity;
import com.sapo.edu.demo.entities.ProductEntity;
import com.sapo.edu.demo.exception.NotFoundException;
import com.sapo.edu.demo.repository.BookingLineRepository;
import com.sapo.edu.demo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import com.sapo.edu.demo.exception.DuplicateException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
@RequiredArgsConstructor
public class BookingLineService {
    private final BookingLineRepository bookingLineRepository;
    private final ModelMapper BookingLineMapper;
    private final ProductRepository productRepository;
    /**
     * Find all CheckLine by code
     * @Param code
     * @return
     */

    public Map<String, Object> getCheckLineByCode(String code) {

        List<BookingLineEntity> bookingLines = new ArrayList<BookingLineEntity>();
        bookingLines = bookingLineRepository.findByBookingCode(code);
        if (bookingLines.isEmpty()) {
            throw new NotFoundException("booking line not found booking code: " + code);

        }


        Map<String, Object> response = new HashMap<>();
        List<BookingLineDto> bookingLineDtos = Arrays.asList(BookingLineMapper.map(bookingLines, BookingLineDto[].class));
        for(BookingLineDto bookingLine : bookingLineDtos) {
            ProductEntity productEntity = productRepository.findByCodeIgnoreCase(bookingLine.getProductCode()).get();
            bookingLine.setProductName(productEntity.getName());
            bookingLine.setTotalPrice(productEntity.getOriginalCost().multiply(BigDecimal.valueOf(bookingLine.getQuantity())));


        }
        response.put("products", bookingLineDtos);

        return response;
    }
}
