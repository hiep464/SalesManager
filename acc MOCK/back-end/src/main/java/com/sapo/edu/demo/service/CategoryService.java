package com.sapo.edu.demo.service;

import com.sapo.edu.demo.dto.CategoryDto;
import com.sapo.edu.demo.entities.CategoryEntity;
import com.sapo.edu.demo.repository.CategoryRepository;
import com.sapo.edu.demo.repository.ProductRepository;
import com.sapo.edu.demo.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import com.sapo.edu.demo.exception.DuplicateException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;




    private final ModelMapper modelMapperCategory;

    /**
     * Save or update storage
     * @param categoryDto
     * @return
     */
    public CategoryDto save(CategoryDto categoryDto) {
        CategoryEntity categoryEntity = new CategoryEntity();
        if(categoryDto.getCode() != null ){
            CategoryDto finalCategoryDto = categoryDto;
            categoryEntity = categoryRepository.findByCode(categoryDto.getCode())
                    .orElseThrow(() -> new DuplicateException("Category not found with id: " + finalCategoryDto.getCode()));
            modelMapperCategory.map(categoryDto, categoryEntity);
        }else{
            categoryEntity = modelMapperCategory.map(categoryDto,CategoryEntity.class);
        }
        categoryEntity = categoryRepository.save(categoryEntity);
        return modelMapperCategory.map(categoryEntity,CategoryDto.class);
    }

    /**
     * find a storage by id
     * @param code
     * @return
     */
    public CategoryDto findByCode(String code) {
        CategoryEntity categoryEntity = categoryRepository.findByCode(code)
                .orElseThrow(() -> new NotFoundException("Storage not found with code: " + code));
        return modelMapperCategory.map(categoryEntity, CategoryDto.class);
    }
    /**
     * Find all storage by code
     * @return
     */
    public Map<String, Object> getCategoriesByCode(String code) {
        List<CategoryEntity> categories = new ArrayList<CategoryEntity>();
        categories = categoryRepository.findByCodeContaining(code);
        if(categories.isEmpty()) {
            throw new NotFoundException("Storage not found with code: " + code);

        }
        Map<String, Object> response = new HashMap<>();
        List<CategoryDto> categoryDto = Arrays.asList(modelMapperCategory.map(categories, CategoryDto[].class));
        response.put("products", categoryDto);

        return response;

    }

    /**
     * Find all storage
     * @return
     */
    public Map<String, Object> getAllCategories() {
        List<CategoryEntity> categories = new ArrayList<CategoryEntity>();
        categories = categoryRepository.findAll();
        // Mapping qua Dto
        Map<String, Object> response = new HashMap<>();
        List<CategoryDto> categoryDto = Arrays.asList(modelMapperCategory.map(categories, CategoryDto[].class));
        response.put("products", categoryDto);

        return response;
    }

    public List<CategoryEntity> getAll(){
        return categoryRepository.findAll();
    }

    public CategoryEntity getByCode(String code) {
        return categoryRepository.findByCode(code).get();
    }
}
