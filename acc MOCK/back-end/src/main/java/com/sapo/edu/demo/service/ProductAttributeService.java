package com.sapo.edu.demo.service;

import com.sapo.edu.demo.dto.product.attribute.CreateProductAttribute;
import com.sapo.edu.demo.entities.ProductAttribute;
import com.sapo.edu.demo.repository.ProductAttributeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ProductAttributeService {

    @Autowired
    ProductAttributeRepository productAttributeRepository;

    public List<ProductAttribute> findAllAttribute(String code){
        return productAttributeRepository.findAllByProductCode(code);
    }

    public Integer getTotalQuantity(){
        return productAttributeRepository.getTotalQuantity();
    }

    public void deleteAttribute(Integer id){
        productAttributeRepository.deleteById(id);
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
