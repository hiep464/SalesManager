package com.sapo.edu.demo.service;

import com.sapo.edu.demo.entities.ProductEntity;
import com.sapo.edu.demo.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

//    public ProductService(ProductRepository productRepository){
//        this.productRepository = productRepository;
//    }

    public Integer getTotalSold(){
        return productRepository.totalSold();
    }

    public Integer getTotalQuantity(){
        return productRepository.totalQuantity();
    }

    public List<Object> getTop3Product(){
        return productRepository.findTopProducts().subList(0, 3);
    }

    public List<Object> getTop3Customer(){
        return productRepository.findTopCustomers().subList(0, 3);
    }

    ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductEntity> getProductByCode(String code){
        return productRepository.findByCodeContaining(code);
    }
}

