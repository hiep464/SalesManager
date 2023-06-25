package com.sapo.edu.demo.service;

import com.sapo.edu.demo.dto.BookingDto;
import com.sapo.edu.demo.dto.BookingLineDto;
import com.sapo.edu.demo.dto.CheckLineDto;
import com.sapo.edu.demo.dto.CheckTableDto;
import com.sapo.edu.demo.entities.*;
import com.sapo.edu.demo.repository.*;
import com.sapo.edu.demo.exception.DuplicateException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

import static java.time.LocalDate.now;

@Service
@RequiredArgsConstructor
public class CheckTableService {
    private final CheckLineRepository checkLineRepository;
    private final CheckTableRepository checkTableRepository;
    private final StaffRepository staffRepository;
    private final ProductAttributeRepository attributeRepository;
    private final ProductRepository productRepository;
    ModelMapper modelMapperCheckInventory = new ModelMapper();

    /**
     * get all check lines
     * @return
     */
    public List<CheckTableDto> getAllCheck() {

        List<CheckTableEntity> checkTable = new ArrayList<CheckTableEntity>();
        checkTable = checkTableRepository.findAll();

        List<CheckTableDto> checkTableDtos = Arrays.asList(modelMapperCheckInventory.map(checkTable, CheckTableDto[].class));

        for(int i = 0; i < checkTable.size(); i++) {
            CheckTableDto checkTableDto = checkTableDtos.get(i);
            CheckTableEntity entity = checkTable.get(i);
            checkTableDto.setStaffName(staffRepository.findById(entity.getStaffCode()).get().getName());
        }
        return checkTableDtos;

    }
    /**
     * get all check request By code
     * @return
     */
    public List<CheckTableDto> getCheckByCode(String code) {
        List<CheckTableEntity> checkTable = checkTableRepository.findByCodeContaining(code);
        List<CheckTableDto> checkTableDtos = Arrays.asList(modelMapperCheckInventory.map(checkTable, CheckTableDto[].class));
        for(int i =0 ; i < checkTableDtos.size();i ++) {
            CheckTableDto checkTableDto = checkTableDtos.get(i);
            CheckTableEntity entity = checkTable.get(i);
            checkTableDto.setStaffName(staffRepository.findById(entity.getStaffCode()).get().getName());
        }



        return checkTableDtos;
    }
    public List<CheckTableDto> getCheckByStatus(String status) {
        List<CheckTableEntity> checkTable = checkTableRepository.findByStatus(status);
        List<CheckTableDto> checkTableDtos = Arrays.asList(modelMapperCheckInventory.map(checkTable, CheckTableDto[].class));
        for(int i =0 ; i < checkTableDtos.size();i ++) {
            CheckTableDto checkTableDto = checkTableDtos.get(i);
            CheckTableEntity entity = checkTable.get(i);
            checkTableDto.setStaffName(staffRepository.findById(entity.getStaffCode()).get().getName());
        }



        return checkTableDtos;
    }

    /**
     * save new check lines
     * @Param checkTableDto
     * @return
     */
    public CheckTableDto save(CheckTableDto checkTableDto) {

        CheckTableEntity checkTableEntity = new CheckTableEntity();
        if(checkTableDto.getCode() != null) {
            if(checkTableRepository.findByCode(checkTableDto.getCode()) != null) {
                throw new DuplicateException("Mã kiểm hàng bị trùng lặp");
            } else {
                checkTableEntity = modelMapperCheckInventory.map(checkTableDto,CheckTableEntity.class);

                checkTableEntity.setStatus("Đang kiểm hàng");
                checkTableEntity.setStaffCode(staffRepository.findByName(checkTableDto.getStaffName()).getCode());
                checkTableEntity = checkTableRepository.save(checkTableEntity);
                for(CheckLineDto checkLineDto : checkTableDto.getCheckLines()) {
                    System.out.println(checkLineDto.toString());
                    CheckLineEntity checkLineEntity = modelMapperCheckInventory.map(checkLineDto,CheckLineEntity.class);
                    checkLineEntity.setCheckCode(checkTableDto.getCode());
                    ProductEntity product = productRepository.findByName(checkLineDto.getProductName());
                    ProductAttribute attribute = attributeRepository.findByProductCodeAndSizeAndColorAndInventoryName(product.getCode(), checkLineDto.getSize(),checkLineDto.getColor(), checkTableDto.getInventoryName());
                    System.out.println(attribute);
                    checkLineEntity.setProductCode(product.getCode());
                    checkLineEntity.setAttributeId(attribute.getId());
                    checkLineRepository.save(checkLineEntity);
                }

            }
        }
        return modelMapperCheckInventory.map(checkTableEntity, CheckTableDto.class);
    }
    public void deleteCheckInventoryRequestByCode(String code) {
        checkTableRepository.deleteById(code);
    }
}
