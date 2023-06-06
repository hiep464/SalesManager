package com.sapo.edu.demo.service;

import com.sapo.edu.demo.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;

@Service
public class OrderService {

    OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository){
        this.orderRepository = orderRepository;
    }

    public BigDecimal getTotal(){
        return orderRepository.total();
    }

    public ArrayList<BigDecimal> getTotalRevenueByPeriod(LocalDate start, LocalDate end){
        System.out.println(start);
        System.out.println(end);
        ArrayList<BigDecimal> arrayList = new ArrayList<>();
        for (LocalDate date = start; date.isBefore(end) || date.isEqual(end); date = date.plusDays(1)) {
            arrayList.add(orderRepository.findTotalRevenueByPeriod(date));
        }
        return arrayList;
    }
}
