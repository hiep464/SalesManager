package com.sapo.edu.demo.service;

import com.sapo.edu.demo.dto.CategoryDto;
import com.sapo.edu.demo.dto.CheckLineDto;
import com.sapo.edu.demo.entities.CheckLineEntity;
import com.sapo.edu.demo.entities.CheckTableEntity;
import com.sapo.edu.demo.entities.ProductEntity;
import com.sapo.edu.demo.entities.SupplierEntity;
import com.sapo.edu.demo.repository.CheckLineRepository;
import com.sapo.edu.demo.exception.DuplicateException;
import com.sapo.edu.demo.exception.NotFoundException;
import com.sapo.edu.demo.repository.CheckTableRepository;
import com.sapo.edu.demo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CheckLineService {
    private final CheckLineRepository checkLineRepository;
    private final ProductRepository productRepository;
    private final CheckTableRepository checkTableRepository;
    private final ModelMapper modelMapperCheckline;
    /**
     * find ALL check line by check code
     * @Param code
     * @return
     */
    public Map<String, Object> getCheckLineByCode(String code) {

        List<CheckLineEntity> checkLines = new ArrayList<CheckLineEntity>();
        checkLines = checkLineRepository.findByCheckCode(code);
        if(checkLines.isEmpty()) {
            throw new NotFoundException("Check line not found check code: " + code);

        }

        Map<String, Object> response = new HashMap<>();
        List<CheckLineDto> checkLineDtos = Arrays.asList(modelMapperCheckline.map(checkLines, CheckLineDto[].class));
        response.put("checkLines", checkLineDtos);

        return response;

    }

    /**
     * update inventory by checkingCode
     * @Param checkingCode
     * @return
     */
    public List<CheckLineDto> updateQuantityProducts(String code) {
        List<CheckLineEntity> checkLineEntities = checkLineRepository.findByCheckCode(code);
        for(CheckLineEntity checkLineEntity : checkLineEntities) {
            ProductEntity product = productRepository.findById(checkLineEntity.getProductCode().toString()).get();
            product.setQuantity(checkLineEntity.getActualQuantity());
            productRepository.save(product);
        }
        CheckTableEntity checkTableEntity = checkTableRepository.findByCode(code);
        checkTableEntity.setStatus("Đã cập nhập số lượng");
        checkTableRepository.save(checkTableEntity);
        List<CheckLineDto> checkLineDtos = Arrays.asList(modelMapperCheckline.map(checkLineEntities, CheckLineDto[].class));
        return checkLineDtos;

    }
}
