package com.sapo.edu.demo.entities;

import jakarta.validation.constraints.NotNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;

@Entity
public class Report {
    @Id
    @Column
    @NotNull
    private String code;

    @Column
    private String staffCode;

    @Column
    private BigDecimal revenue;

    @Column
    private Integer soldProduct;

    @Column
    private Integer soldOrder;

    @Column
    private BigDecimal interestMoney;

    @Column
    private Date createAt;

    public Report(String code, String staffCode, BigDecimal revenue, Integer soldProduct, Integer soldOrder, BigDecimal interestMoney, Date createAt) {
        this.code = code;
        this.staffCode = staffCode;
        this.revenue = revenue;
        this.soldProduct = soldProduct;
        this.soldOrder = soldOrder;
        this.interestMoney = interestMoney;
        this.createAt = createAt;
    }

    public Report() {

    }

    public String getStaffCode() {
        return staffCode;
    }

    public void setStaffCode(String staffCode) {
        this.staffCode = staffCode;
    }

    public BigDecimal getRevenue() {
        return revenue;
    }

    public void setRevenue(BigDecimal revenue) {
        this.revenue = revenue;
    }

    public Integer getSoldProduct() {
        return soldProduct;
    }

    public void setSoldProduct(Integer soldProduct) {
        this.soldProduct = soldProduct;
    }

    public Integer getSoldOrder() {
        return soldOrder;
    }

    public void setSoldOrder(Integer soldOrder) {
        this.soldOrder = soldOrder;
    }

    public BigDecimal getInterestMoney() {
        return interestMoney;
    }

    public void setInterestMoney(BigDecimal interestMoney) {
        this.interestMoney = interestMoney;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
