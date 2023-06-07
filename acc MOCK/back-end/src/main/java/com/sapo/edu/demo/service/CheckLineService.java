package com.sapo.edu.demo.service;

import com.sapo.edu.demo.dto.CategoryDto;
import com.sapo.edu.demo.dto.CheckLineDto;
import com.sapo.edu.demo.entities.CheckLineEntity;
import com.sapo.edu.demo.entities.SupplierEntity;
import com.sapo.edu.demo.repository.CheckLineRepository;
import com.sapo.edu.demo.exception.DuplicateException;
import com.sapo.edu.demo.exception.NotFoundException;
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
    private final ModelMapper modelMapperCheckline;
    /**
     * find ALL check line by check code
     * @Param code
     * @return
     */
    public Map<String, Object> getCheckLineByCode(int page, int size,String code) {
        Pageable paging = PageRequest.of(page, size, Sort.by(
                        Sort.Order.asc("id")
                )
        );
        Page<CheckLineEntity> pageCheckLine;
        List<CheckLineEntity> checkLines = new ArrayList<CheckLineEntity>();
        pageCheckLine = checkLineRepository.findByCheckCode(code,paging);
        if(checkLines.isEmpty()) {
            throw new NotFoundException("Check line not found check code: " + code);

        }
        checkLines = pageCheckLine.getContent();
        Map<String, Object> response = new HashMap<>();
        List<CheckLineDto> checkLineDtos = Arrays.asList(modelMapperCheckline.map(checkLines, CheckLineDto[].class));
        response.put("products", checkLineDtos);

        return response;

    }
}
