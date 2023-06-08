package com.sapo.edu.demo.service;

import com.sapo.edu.demo.entities.OrderLine;
import com.sapo.edu.demo.repository.OrderLineRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderLineService {

    OrderLineRepository orderLineRepository;

    public OrderLineService(OrderLineRepository orderLineRepository) {
        this.orderLineRepository = orderLineRepository;
    }

    public List<OrderLine> createOrderLine(List<OrderLine> orderLines){
        return orderLineRepository.saveAll(orderLines);
    }
}
