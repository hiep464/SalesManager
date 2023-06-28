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

        return modelMapper;
    }


}
