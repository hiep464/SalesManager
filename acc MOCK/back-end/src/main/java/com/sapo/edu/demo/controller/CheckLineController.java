package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.dto.ResponseObject;
import com.sapo.edu.demo.service.CategoryService;
import com.sapo.edu.demo.service.CheckLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@RestController
@Validated
@RequestMapping("admin")
public class CheckLineController {
    @Autowired
    private CheckLineService checkLineService;
    @GetMapping("/check_line")
    public ResponseEntity<ResponseObject> getCheckLineByCheckCode(
            @RequestParam(defaultValue = "0", name = "page") int page,
            @RequestParam(defaultValue = "10", name = "size") int size,
            @RequestParam("checkCode") String checkCode
    ) {
        Map<String, Object> response = checkLineService.getCheckLineByCode(page,size,checkCode);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseObject("success", "", response));
    }
}
