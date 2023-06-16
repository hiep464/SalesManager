package com.sapo.edu.demo.entities;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity

@Table(name = "order_table")
public class OrderTable {
    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "code", nullable = false)
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
    private Date orderDate;

    @Column(name="status")
    private String status;

    public OrderTable() {
    }

    public OrderTable(String code, String customerCode, String staffCode, BigDecimal total, Date orderDate, String status) {
        this.code = code;
        this.customerCode = customerCode;
        this.staffCode = staffCode;
        this.total = total;
        this.orderDate = orderDate;
        this.status = status;
    }

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

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
