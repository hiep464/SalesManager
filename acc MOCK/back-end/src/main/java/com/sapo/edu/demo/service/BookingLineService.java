package com.sapo.edu.demo.service;

import com.sapo.edu.demo.dto.BookingLineDto;
import com.sapo.edu.demo.dto.CheckLineDto;
import com.sapo.edu.demo.entities.BookingLineEntity;
import com.sapo.edu.demo.entities.CheckLineEntity;
import com.sapo.edu.demo.entities.ProductAttribute;
import com.sapo.edu.demo.entities.ProductEntity;
import com.sapo.edu.demo.exception.NotFoundException;
import com.sapo.edu.demo.repository.BookingLineRepository;
import com.sapo.edu.demo.repository.ProductAttributeRepository;
import com.sapo.edu.demo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.hibernate.validator.constraints.Range;
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
    private final ProductAttributeRepository attributeRepository;
    /**
     * Find all CheckLine by code
     * @Param code
     * @return
     */

    public List<BookingLineDto> getCheckLineByCode(String code) {

        List<BookingLineEntity> bookingLines = new ArrayList<BookingLineEntity>();
        bookingLines = bookingLineRepository.findByBookingCode(code);
        if (bookingLines.isEmpty()) {
            throw new NotFoundException("booking line not found booking code: " + code);

        }
        List<BookingLineDto> bookingLineDtos = Arrays.asList(BookingLineMapper.map(bookingLines, BookingLineDto[].class));
        for(int i = 0; i < bookingLines.size(); i++) {
            BookingLineDto bookingLineDto = bookingLineDtos.get(i);
            BookingLineEntity bookingLineEntity = bookingLines.get(i);
            ProductEntity productEntity = productRepository.findById(bookingLineEntity.getProductCode()).get();
            bookingLineDto.setProductName(productEntity.getName());
            ProductAttribute attribute = attributeRepository.findById(bookingLineEntity.getAttributeId()).get();
            bookingLineDto.setImage(attribute.getImage());
            bookingLineDto.setColor(attribute.getColor());
            bookingLineDto.setSize(attribute.getSize());
            bookingLineDto.setInventoryName(attribute.getInventoryName());
        }

        return bookingLineDtos;
    }
}
