package com.sapo.edu.demo.service;

import com.sapo.edu.demo.dto.product.attribute.CreateProductAttribute;
import com.sapo.edu.demo.entities.ProductAttribute;
import com.sapo.edu.demo.entities.ProductEntity;
import com.sapo.edu.demo.repository.ProductAttributeRepository;
import com.sapo.edu.demo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductAttributeService {

    @Autowired
    ProductAttributeRepository productAttributeRepository;

    private final ProductRepository productRepository;
    ModelMapper modelMapperProductAttribute = new ModelMapper();
    public List<ProductAttribute> findAllAttribute(String code){
        return productAttributeRepository.findByProductCode(code);
    }
    public ProductAttribute findAllAttributeByProductNameAndSizeAndName(String name, String size, String color, String inventoryName) {
        ProductEntity product = productRepository.findByName(name);
        ProductAttribute attribute = productAttributeRepository.findByProductCodeAndSizeAndColorAndInventoryName(product.getCode(), size, color, inventoryName );

        return attribute;

    }

    //bao
    public List<String> getAllSizes() {
        return productAttributeRepository.findDistinctSize();
    }

    public List<String> getAllColors() {
        return productAttributeRepository.findDistinctColor();
    }
    //bao

    public Integer getTotalQuantity(){
        return productAttributeRepository.getTotalQuantity();
    }

    public void deleteAttribute(Integer id){
        ProductAttribute productAttribute = productAttributeRepository.findById(id).get();
        System.out.println("trc: " + productAttribute);
        productAttribute.setStatus("delete");
        System.out.println("sau: " + productAttribute);
        productAttributeRepository.save(productAttribute);
    }

    public List<CreateProductAttribute> addListProductAttributes(List<CreateProductAttribute> createProductAttributes){
        for (CreateProductAttribute createProductAttribute : createProductAttributes) {
            ProductAttribute productAttribute = new ProductAttribute();
            productAttribute.setCreateAt(LocalDate.now());
            productAttribute.setUpdateAt(null);
            productAttribute.setColor(createProductAttribute.getColor());
            productAttribute.setSize(createProductAttribute.getSize());
            productAttribute.setQuantity(createProductAttribute.getQuantity());
            productAttribute.setSold(createProductAttribute.getSold());
            productAttribute.setProductCode(createProductAttribute.getProductCode());
            System.out.println(productAttribute);
            productAttributeRepository.save(productAttribute);
        }
        return createProductAttributes;
    }

    public List<ProductAttribute> updateListProductAttribute(List<ProductAttribute> productAttributes){
        for(ProductAttribute productAttribute : productAttributes){
            productAttributeRepository.save(productAttribute);
        }
        return productAttributes;
    }
}
