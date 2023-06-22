package com.sapo.edu.demo.service;

import com.sapo.edu.demo.dto.CheckLineDto;
import com.sapo.edu.demo.entities.CheckLineEntity;
import com.sapo.edu.demo.entities.CheckTableEntity;
import com.sapo.edu.demo.entities.ProductAttribute;
import com.sapo.edu.demo.entities.ProductEntity;
import com.sapo.edu.demo.repository.CheckLineRepository;
import com.sapo.edu.demo.exception.NotFoundException;
import com.sapo.edu.demo.repository.CheckTableRepository;
import com.sapo.edu.demo.repository.ProductAttributeRepository;
import com.sapo.edu.demo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CheckLineService {
    private final CheckLineRepository checkLineRepository;
    private final ProductRepository productRepository;
    private final CheckTableRepository checkTableRepository;
    private final ModelMapper modelMapperCheckline;
    private final ProductAttributeRepository attributeRepository;

    public CheckLineService(CheckLineRepository checkLineRepository, ProductRepository productRepository, CheckTableRepository checkTableRepository, ModelMapper modelMapperCheckline, ProductAttributeRepository attributeRepository) {
        this.checkLineRepository = checkLineRepository;
        this.productRepository = productRepository;
        this.checkTableRepository = checkTableRepository;
        this.modelMapperCheckline = modelMapperCheckline;
        this.attributeRepository = attributeRepository;
    }

    /**
     * find ALL check line by check code
     * @Param code
     * @return
     */
    public List<CheckLineDto> getCheckLineByCode(String code) {
        List<CheckLineEntity> checkLines = new ArrayList<CheckLineEntity>();
        checkLines = checkLineRepository.findByCheckCode(code);
        if(checkLines.isEmpty()) {
            throw new NotFoundException("Không tìm thấy phiếu kiểm hàng với mã kiểm: " + code);
        }

        List<CheckLineDto> checkLineDtos = Arrays.asList(modelMapperCheckline.map(checkLines, CheckLineDto[].class));
        for(int i = 0; i < checkLineDtos.size(); i++) {
            CheckLineDto checkLineDto = checkLineDtos.get(i);
            CheckLineEntity checkLineEntity = checkLines.get(i);
            ProductAttribute attribute = attributeRepository.findById(checkLineEntity.getAttributeId()).get();
            checkLineDto.setSize(attribute.getSize());
            checkLineDto.setColor(attribute.getColor());
            checkLineDto.setProductName((productRepository.findById(checkLineEntity.getProductCode()).get()).getName());
            checkLineDto.setBrand((productRepository.findById(checkLineEntity.getProductCode()).get()).getBrand());

        }

        return checkLineDtos;
    }

    /**
     * update inventory by checkingCode
     * @Param checkingCode
     * @return
     */
    public List<CheckLineDto> updateQuantityProducts(String code) {
        CheckTableEntity checkTableEntity = checkTableRepository.findByCode(code);
        List<CheckLineEntity> checkLineEntities = checkLineRepository.findByCheckCode(code);
        for(CheckLineEntity checkLineEntity : checkLineEntities) {
            ProductAttribute productAttribute =  attributeRepository.findById(checkLineEntity.getAttributeId()).get();
            productAttribute.setQuantity(checkLineEntity.getActualQuantity());
            attributeRepository.save(productAttribute);
        }

        checkTableEntity.setStatus("Đã cập nhập số lượng");
        checkTableRepository.save(checkTableEntity);
        List<CheckLineDto> checkLineDtos = Arrays.asList(modelMapperCheckline.map(checkLineEntities, CheckLineDto[].class));
        return checkLineDtos;
    }
}
