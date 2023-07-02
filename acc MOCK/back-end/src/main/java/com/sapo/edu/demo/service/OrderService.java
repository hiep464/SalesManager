package com.sapo.edu.demo.service;

import com.sapo.edu.demo.entities.Order;
import com.sapo.edu.demo.repository.OrderRepository;
import org.apache.tomcat.jni.Local;
import org.springframework.stereotype.Service;
import org.json.simple.JSONObject;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

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

    public Integer getTotalSold() {
        return orderRepository.getTotalSold();}
    public Order createOrder(Order newOrder){
        return orderRepository.save(newOrder);
    }

    public ArrayList<BigDecimal> getReportData(String staffCode, LocalDate startDate, LocalDate endDate){
        ArrayList<BigDecimal> arrayList = new ArrayList<>();
        for (LocalDate date = startDate; date.isBefore(endDate) || date.isEqual(endDate); date = date.plusDays(1)) {
            arrayList.add(orderRepository.findTotalRevenueByStaffCode(date,staffCode));
        }
        return arrayList;
    }

    public Map<String, Object> getReportInfo(String staffCode,LocalDate startDate, LocalDate endDate){
        ArrayList<BigDecimal> revenueList = new ArrayList<>();
        for (LocalDate date = startDate; date.isBefore(endDate) || date.isEqual(endDate); date = date.plusDays(1)) {
            BigDecimal revenue = orderRepository.findTotalRevenueByStaffCode(date, staffCode);
            revenueList.add(revenue);
        }
        BigDecimal totalRevenue = revenueList.stream()
                .filter(revenue -> revenue != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        Map<String, Object> revenueData = orderRepository.getRevenueOrderCountAndProductSoldForStaffCode(staffCode, startDate, endDate);
        JSONObject resultJson = new JSONObject();
        resultJson.put("total_profit", revenueData.get("total_profit"));
        resultJson.put("orderCount", revenueData.get("order_count"));
        resultJson.put("productSold", revenueData.get("product_sold"));
        resultJson.put("revenue", totalRevenue);
        return resultJson;
    }

    public List<Map<String , Object>> getAllOrders(){
        return orderRepository.findAllOrder();
    }
    public List<Map<String , Object>> SearchAllOrdersByCode(String code){
        return orderRepository.searchAllOrderbyCode(code);
    }

    public List<Map<String , Object>> searchAllOrderbyStaffCode(String code, LocalDate start , LocalDate end){
        return orderRepository.searchAllOrderbyStaffCode(code,start,end);
    }

    public Map<String , Object> getOrderByCode(String code){
        return orderRepository.getOrderByCode(code);
    }

    public List<Map<String, Object>> getDetailOrderOnReport(String staffCode,LocalDate startDate, LocalDate endDate){
        return orderRepository.getRevenueOrderForStaffCode(staffCode,startDate,endDate);
    }

    public Integer getOrderCount(){
        return orderRepository.getOrderCount();
    }
}
