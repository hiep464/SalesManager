package com.sapo.edu.demo.service;

import com.sapo.edu.demo.dto.CategoryDto;
import com.sapo.edu.demo.dto.SupplierDto;
import com.sapo.edu.demo.entities.CategoryEntity;
import com.sapo.edu.demo.entities.SupplierEntity;
import com.sapo.edu.demo.exception.NotFoundException;
import com.sapo.edu.demo.repository.CategoryRepository;
import com.sapo.edu.demo.repository.ProductRepository;
import com.sapo.edu.demo.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SupplierService {
    private final SupplierRepository supplierRepository;
    private final ModelMapper modelMapperSupplier;

    /**
     * Save or update storage
     * @param supplierDto
     * @return
     */
    public SupplierDto save(SupplierDto supplierDto) {
        SupplierEntity supplierEntity = new SupplierEntity();
        if(supplierDto.getCode() != null ){
            if(supplierRepository.findByCode(supplierDto.getCode()) != null){
                throw new NotFoundException("Supplier code was exists");
            }
        }else{
            supplierEntity = modelMapperSupplier.map(supplierDto,SupplierEntity.class);
        }
        supplierEntity = supplierRepository.save(supplierEntity);
        return modelMapperSupplier.map(supplierEntity,SupplierDto.class);
    }

    /**
     * find a storage by id
     * @param code
     * @return
     */
    public SupplierDto findByCode(String code) {
        SupplierEntity supplierEntity = supplierRepository.findByCode(code)
                .orElseThrow(() -> new NotFoundException("Storage not found with code: " + code));
        return modelMapperSupplier.map(supplierEntity, SupplierDto.class);
    }
    /**
     * Find all storage by code
     * @return
     */
    public Map<String, Object> getSuppliersByCode(String code) {
        List<SupplierEntity> suppliers = new ArrayList<SupplierEntity>();
        suppliers = supplierRepository.findByCodeContaining(code);
        if(suppliers.isEmpty()) {
            throw new NotFoundException("Storage not found with code: " + code);

        }
        Map<String, Object> response = new HashMap<>();
        List<CategoryDto> supplierDto = Arrays.asList(modelMapperSupplier.map(suppliers, CategoryDto[].class));
        response.put("products", supplierDto);

        return response;

    }

    /**
     * Find all storage
     * @return
     */
    public Map<String, Object> getAllSuppliers() {
        List<SupplierEntity> suppliers = new ArrayList<SupplierEntity>();
        suppliers = supplierRepository.findAll();
        // Mapping qua Dto
        Map<String, Object> response = new HashMap<>();
        List<SupplierDto> supplierDto = Arrays.asList(modelMapperSupplier.map(suppliers, SupplierDto[].class));
        response.put("products", supplierDto);

        return response;
    }
}
