package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.dto.CheckLineDto;
import com.sapo.edu.demo.dto.ProductDto;
import com.sapo.edu.demo.dto.ResponseObject;
import com.sapo.edu.demo.service.CategoryService;
import com.sapo.edu.demo.service.CheckLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@RestController
@Validated
@RequestMapping("admin")
@CrossOrigin(origins = "http://localhost:3000")

public class CheckLineController {
    @Autowired
    private CheckLineService checkLineService;
    @GetMapping("/check_line")
    public List<CheckLineDto> getCheckLineByCheckCode(

            @RequestParam("checkCode") String checkCode
    ) {
        List<CheckLineDto> response = checkLineService.getCheckLineByCode(checkCode);
        return response;
    }
    @PostMapping("/check_line/{checkCode}")
    public ResponseEntity<ResponseObject> updateQuantityProductsByCheckCode(
            @PathVariable("checkCode") String checkCode
    ) {
        List<CheckLineDto> response = checkLineService.updateQuantityProducts(checkCode);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("success","Hoàn tất cập nhập số lượng", response));
    }
}
