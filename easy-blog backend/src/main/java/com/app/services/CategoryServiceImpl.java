package com.app.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Exceptions.ResourceNotFoundException;
import com.app.pojos.Category;
import com.app.repository.CategoryRepo;

import payloads.CategoryDto;
@Service
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
	CategoryRepo categoryRepo;
	
	@Autowired
	ModelMapper modelMapper;

	@Override
	public CategoryDto createCategory(CategoryDto categoryDto) {
		Category category = this.modelMapper.map(categoryDto,Category.class);
		Category added = this.categoryRepo.save(category);
		return this.modelMapper.map(added,CategoryDto.class);
	}

	@Override
	public CategoryDto updateCategory(CategoryDto categoryDto, Integer categoryId) {
		Category cat = this.categoryRepo.findById(categoryId)
				.orElseThrow(()->new ResourceNotFoundException("Category","CategoryId",categoryId));
		
		cat.setCategoryTitle(categoryDto.getCategoryTitle());
		cat.setCategoryDescription(categoryDto.getCategoryDescription());
		Category updatedCat = this.categoryRepo.save(cat);
		return this.modelMapper.map(updatedCat,CategoryDto.class);
	}

	@Override
	public void deleteCategory(Integer categoryId) {
		Category cat = this.categoryRepo.findById(categoryId)
				.orElseThrow(()->new ResourceNotFoundException("Category","CategoryId",categoryId));
			this.categoryRepo.delete(cat);
			
	}

	@Override
	public CategoryDto getCategory(Integer categoryId) {
		Category cat = this.categoryRepo.findById(categoryId)
				.orElseThrow(()->new ResourceNotFoundException("Category","CategoryId",categoryId));
			
		return this.modelMapper.map(cat,CategoryDto.class);
	}

	@Override
	public List<CategoryDto> getAllCategory() {
		List<Category> categories= this.categoryRepo.findAll();
		List<CategoryDto> Dtos = categories.stream()
				.map(cat->this.modelMapper.map(cat,CategoryDto.class))
				.collect(Collectors.toList());
		return Dtos;
	}
	
	


}
