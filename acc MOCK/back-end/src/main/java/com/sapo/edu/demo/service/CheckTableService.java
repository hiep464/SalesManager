package com.sapo.edu.demo.service;

import com.sapo.edu.demo.dto.BookingDto;
import com.sapo.edu.demo.dto.BookingLineDto;
import com.sapo.edu.demo.dto.CheckLineDto;
import com.sapo.edu.demo.dto.CheckTableDto;
import com.sapo.edu.demo.entities.BookingEntity;
import com.sapo.edu.demo.entities.CheckLineEntity;
import com.sapo.edu.demo.entities.CheckTableEntity;
import com.sapo.edu.demo.entities.ProductEntity;
import com.sapo.edu.demo.repository.CheckLineRepository;
import com.sapo.edu.demo.repository.CheckTableRepository;
import com.sapo.edu.demo.exception.DuplicateException;
import com.sapo.edu.demo.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CheckTableService {
    private final CheckLineRepository checkLineRepository;
    private final CheckTableRepository checkTableRepository;
    private final StaffRepository staffRepository;
    ModelMapper modelMapperCheckInventory = new ModelMapper();
    /**
     * get all check lines
     * @return
     */
    public Map<String, Object> getAllCheck(int page, int size) {
        Pageable paging = PageRequest.of(page, size, Sort.by(
                        Sort.Order.asc("code")
                )
        );
        Page<CheckTableEntity> pageCheckTable;
        List<CheckTableEntity> checkTable = new ArrayList<CheckTableEntity>();
        pageCheckTable = checkTableRepository.findAll(paging);
        checkTable = pageCheckTable.getContent();
        Map<String, Object> response = new HashMap<>();
        List<CheckTableDto> checkTableDtos = Arrays.asList(modelMapperCheckInventory.map(checkTable, CheckTableDto[].class));
        response.put("products", checkTableDtos);
        for(int i = 0; i < checkTable.size(); i++) {
            CheckTableDto checkTableDto = checkTableDtos.get(i);
            CheckTableEntity entity = checkTable.get(i);
            checkTableDto.setStaffName(staffRepository.findById(entity.getStaffCode()).get().getName());
        }
        return response;

    }
    /**
     * get all check request By code
     * @return
     */
    public CheckTableDto getCheckByCode(String code) {


        CheckTableEntity checkTable = new CheckTableEntity();
        checkTable = checkTableRepository.findById(code).get();


        CheckTableDto checkTableDto = modelMapperCheckInventory.map(checkTable, CheckTableDto.class);
        checkTableDto.setStaffName(staffRepository.findById(checkTable.getStaffCode()).get().getName());


        return checkTableDto;

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
                throw new DuplicateException("This code was exist");
            } else {
                checkTableEntity = modelMapperCheckInventory.map(checkTableDto,CheckTableEntity.class);

                checkTableEntity.setStatus("Đang kiểm hàng");
                checkTableEntity.setStaffCode(staffRepository.findByName(checkTableDto.getStaffName()).getCode());
                checkTableEntity = checkTableRepository.save(checkTableEntity);
                for(CheckLineDto checkLineDto : checkTableDto.getCheckLines()) {
                    System.out.println(checkLineDto.toString());
                    CheckLineEntity checkLineEntity = modelMapperCheckInventory.map(checkLineDto,CheckLineEntity.class);
                    checkLineEntity.setCheckCode(checkTableDto.getCode());
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
