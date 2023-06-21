package com.sapo.edu.demo.service;

import com.sapo.edu.demo.dto.InventoryDto;
import com.sapo.edu.demo.entities.InventoryEntity;
import com.sapo.edu.demo.repository.InventoryRepository;
import com.sapo.edu.demo.exception.DuplicateException;
import com.sapo.edu.demo.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class InventoryService {
    private final InventoryRepository inventoryRepository;


    private final ModelMapper modelMapperCategory;

    /**
     * Save or update storage
     * @param inventoryDto
     * @return
     */
    public InventoryDto save(InventoryDto inventoryDto) {
        InventoryEntity inventoryEntity = new InventoryEntity();
        if(inventoryDto.getName() != null ){
            InventoryDto finalInventoryDto = inventoryDto;
            inventoryEntity = inventoryRepository.findById(inventoryDto.getName())
                    .orElseThrow(() -> new NotFoundException("Storage not found with id: " + finalInventoryDto.getName()));
            modelMapperCategory.map(inventoryDto, inventoryEntity);
        }else{
            inventoryEntity = modelMapperCategory.map(inventoryDto,InventoryEntity.class);
        }
        inventoryEntity = inventoryRepository.save(inventoryEntity);
        return modelMapperCategory.map(inventoryEntity,InventoryDto.class);
    }

    /**
     * find a storage by id
     * @param code
     * @return
     */
    public InventoryDto findByCode(String code) {
        InventoryEntity inventoryEntity = inventoryRepository.findByName(code)
                .orElseThrow(() -> new NotFoundException("Storage not found with id: " + code));
        return modelMapperCategory.map(inventoryEntity, InventoryDto.class);
    }

    /**
     * Find all storage
     * @return
     */
    public List<InventoryDto> getAll() {
        List<InventoryEntity> inventories = new ArrayList<InventoryEntity>();
        inventories = inventoryRepository.findAll();
        // Mapping qua Dto
        List<InventoryDto> inventoryDtos = Arrays.asList(modelMapperCategory.map(inventories, InventoryDto[].class));


        return inventoryDtos;
    }


}
