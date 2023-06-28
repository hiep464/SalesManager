package com.sapo.edu.demo.service;

import com.sapo.edu.demo.dto.BookingLineDto;
import com.sapo.edu.demo.dto.CheckLineDto;
import com.sapo.edu.demo.entities.*;
import com.sapo.edu.demo.exception.NotFoundException;
import com.sapo.edu.demo.repository.*;
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
    private final BookingRepository bookingRepository;
    private final CategoryRepository categoryRepository;
    /**
     * Find all CheckLine by code
     * @Param code
     * @return
     */

    public List<BookingLineDto> getCheckLineByCode(String code) {

        List<BookingLineEntity> bookingLines = new ArrayList<BookingLineEntity>();
        bookingLines = bookingLineRepository.findByBookingCode(code);
        BookingEntity entity = bookingRepository.findById(code).get();
        if (bookingLines.isEmpty()) {
            throw new NotFoundException("booking line not found booking code: " + code);

        }
        List<BookingLineDto> bookingLineDtos = Arrays.asList(BookingLineMapper.map(bookingLines, BookingLineDto[].class));
        for(int i = 0; i < bookingLines.size(); i++) {
            BookingLineDto bookingLineDto = bookingLineDtos.get(i);
            BookingLineEntity bookingLineEntity = bookingLines.get(i);
            ProductEntity productEntity = productRepository.findById(bookingLineEntity.getProductCode()).get();
            bookingLineDto.setBrand(productEntity.getBrand());
            CategoryEntity category = categoryRepository.findById(productEntity.getCategoryCode()).get();
            bookingLineDto.setCategory(category.getName());
            bookingLineDto.setProductName(productEntity.getName());
            ProductAttribute attribute = attributeRepository.findById(bookingLineEntity.getAttributeId()).get();
            bookingLineDto.setImage(attribute.getImage());
            bookingLineDto.setColor(attribute.getColor());
            bookingLineDto.setSize(attribute.getSize());
            bookingLineDto.setInventoryName(entity.getInventoryName());
        }

        return bookingLineDtos;
    }
}
