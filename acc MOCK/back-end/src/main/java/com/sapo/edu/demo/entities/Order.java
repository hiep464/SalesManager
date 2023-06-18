package com.sapo.edu.demo.entities;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Entity

@Table(name = "order_table")
public class Order {
    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private String code;

    @Column(name="customer_code")
    private String customerCode;

    @Column(name="staff_code")
    private String staffCode;

    @Column(name="total")
    private BigDecimal total;

    @Column(name="quantity")
    private Integer quantity;

    @Column(name="order_date")
    private LocalDate orderDate;

    @Column(name="status")
    private String status;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public String getStaffCode() {
        return staffCode;
    }

    public void setStaffCode(String staffCode) {
        this.staffCode = staffCode;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
