package com.sapo.edu.demo.service;

import com.sapo.edu.demo.entities.OrderTable;
import com.sapo.edu.demo.entities.Report;
import com.sapo.edu.demo.repository.OrderTableRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class OrderTableService {
    OrderTableRepository orderTableRepository;

    public OrderTableService(OrderTableRepository orderTableRepository) {
        this.orderTableRepository = orderTableRepository;
    }

    public OrderTable createOrder(OrderTable newOrder){
        return orderTableRepository.save(newOrder);
    }

    public Map<String, Object> getReportData(String staffCode, Date startDate){
        return orderTableRepository.getRevenueOrderCountAndProductSoldForStaffCode(staffCode,startDate);
    }
}
