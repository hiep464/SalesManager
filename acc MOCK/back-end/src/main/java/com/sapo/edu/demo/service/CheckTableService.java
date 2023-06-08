package com.sapo.edu.demo.service;

import com.sapo.edu.demo.dto.CheckLineDto;
import com.sapo.edu.demo.dto.CheckTableDto;
import com.sapo.edu.demo.entities.CheckLineEntity;
import com.sapo.edu.demo.entities.CheckTableEntity;
import com.sapo.edu.demo.repository.CheckLineRepository;
import com.sapo.edu.demo.repository.CheckTableRepository;
import com.sapo.edu.demo.exception.DuplicateException;
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
public class CheckTableService {
    private final CheckLineRepository checkLineRepository;
    private final CheckTableRepository checkTableRepository;
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

        return response;

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
}
