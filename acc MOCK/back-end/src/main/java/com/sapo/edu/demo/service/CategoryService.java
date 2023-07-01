package com.sapo.edu.demo.service;

import com.sapo.edu.demo.dto.CategoryDto;
import com.sapo.edu.demo.entities.CategoryEntity;
import com.sapo.edu.demo.entities.ProductEntity;
import com.sapo.edu.demo.repository.CategoryRepository;
import com.sapo.edu.demo.repository.ProductRepository;
import com.sapo.edu.demo.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sapo.edu.demo.exception.DuplicateException;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapperCategory;

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
        response.put("categories", categoryDto);

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
        response.put("categories", categoryDto);

        return response;
    }

    public List<CategoryEntity> getAll(){
        return categoryRepository.findAll();
    }

    public CategoryEntity getByCode(String code) {
        return categoryRepository.findByCode(code).get();
    }

    public CategoryEntity saveCategory (com.sapo.edu.demo.dto.category.CategoryDto categoryDto){
        Integer maxId = categoryRepository.findMaxCategoryId();
        Integer id = maxId + 1;
        String code = null;
        if(maxId < 10)
            code = "C00" + id;
        else if(id >= 10 && id < 100)
            code = "C0" + id;
        else
            code = "C" + id;
        CategoryEntity categoryEntity = new CategoryEntity();
        categoryEntity.setCode(code);
        categoryEntity.setName(categoryDto.getName());
        categoryEntity.setDescription(categoryDto.getDescription());
        categoryEntity.setCreateAt(LocalDate.now());
        return categoryRepository.save(categoryEntity);
    }

    public CategoryEntity updateCategory(CategoryEntity categoryEntity){
        return categoryRepository.save(categoryEntity);
    }

    public void deleteCategory(Integer id){
        CategoryEntity categoryEntity = categoryRepository.findById(id).get();
        List<ProductEntity> productEntities = productRepository.findAllByCategoryId(id);
        for(ProductEntity productEntity : productEntities){
            productEntity.setCategoryId(null);
            productRepository.save(productEntity);
        }
//        categoryRepository.delete(categoryEntity.getId());
        categoryRepository.deleteById(id);
    }
}
