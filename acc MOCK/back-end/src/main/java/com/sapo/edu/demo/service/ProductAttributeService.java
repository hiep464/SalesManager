package com.sapo.edu.demo.service;

import com.sapo.edu.demo.entities.ProductAttribute;
import com.sapo.edu.demo.repository.ProductAttributeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductAttributeService {

    @Autowired
    ProductAttributeRepository productAttributeRepository;

    public List<ProductAttribute> findAllAttribute(String code){
        return productAttributeRepository.findAllByProductCode(code);
    }
}