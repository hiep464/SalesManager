package com.sapo.edu.demo;

import com.sapo.edu.demo.entities.*;
import com.sapo.edu.demo.repository.CategoryRepository;
import org.modelmapper.Converter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import com.sapo.edu.demo.dto.*;
import com.sapo.edu.demo.entities.BookingEntity;




@Configuration

public class ModelMapperConfig {
    @Autowired
    private CategoryRepository categoryRepository;
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT).setAmbiguityIgnored(true);

        Converter<ProductEntity, ProductDto> entityToDtoConverter = context -> {
            ProductEntity entity = context.getSource();
            ProductDto dto = new ProductDto();

            dto.setCategoryName(getCategoryNameByCode(entity.getCategoryCode()));

            return dto;
        };
        modelMapper.addConverter(entityToDtoConverter);
        return modelMapper;
    }
    private String getCategoryNameByCode(String categoryCode) {
        // Thực hiện truy vấn đến category repository để lấy category name theo category code
        CategoryEntity category = categoryRepository.findByCode(categoryCode).get();
        System.out.println(category.getName());
        if (category != null) {
            return category.getName();
        }
        return null;
    }

}
