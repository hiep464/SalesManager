package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.dto.CheckTableDto;
import com.sapo.edu.demo.dto.ResponseObject;
import com.sapo.edu.demo.service.CheckTableService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Validated
@RequestMapping("/admin/inventory")
@CrossOrigin(origins = "http://localhost:3000")

public class CheckInventoryController {
    @Autowired
    private CheckTableService checkTableService;
    @GetMapping("/check_inventory")
    public List<CheckTableDto> getAllCheck() {
        List<CheckTableDto> response = checkTableService.getAllCheck();
        return response;
    }
    @GetMapping("/check_inventory/code")
    public List<CheckTableDto> findCheckByCode(
            @RequestParam(name = "code") String code
    ) {
        List<CheckTableDto> response = checkTableService.getCheckByCode(code);
        return response;
    }
    @GetMapping("/check_inventory/filter")
    public List<CheckTableDto> findCheckByName(
            @RequestParam(name = "status") String status
    ) {
        List<CheckTableDto> response = checkTableService.getCheckByStatus(status);
        return response;
    }
    @PostMapping("/check_inventory")
    public ResponseEntity<ResponseObject> save(@RequestBody CheckTableDto checkTableDto) {
        CheckTableDto savedCheckTable = checkTableService.save(checkTableDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseObject("success", "Post done", savedCheckTable));
    }
    @DeleteMapping("/check_inventory/{code}")
    public String deleteCheckInventoryRequest(@PathVariable String code) {
        checkTableService.deleteCheckInventoryRequestByCode(code);
        return "Đã xóa";
    }

}
