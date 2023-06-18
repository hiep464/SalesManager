package com.sapo.edu.demo.entities;

import lombok.Data;

import javax.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.Date;

@Entity
@Table(name = "feedback")
@Data
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "ID")
    private Integer id;
    @Column(name = "customer_code")
    @NotNull(message = "customerCode must not be null")
    private String customerCode;
    @Column
    @NotNull(message = "phone must not be null")
    @Size(max = 10)
    private String phone;
    @Column(name = "staff_code")
    @NotNull(message = "staffCode must not be null")
    private String staffCode;
    @Column
    @NotNull(message = "Content must not be null")
    @Size(max = 1000)
    private String content;
    @Column(name = "feedback_date")
    @NotNull(message = "feedbackDate must not be null")
    private Date feedbackDate;
    @Column
    @NotNull(message = "status must not be null")
    @Size(max = 10)
    private String status;

    public Feedback() {
    }

    public Feedback(Integer id, String customerCode, String phone, String staffCode, String content, Date feedbackDate, String status) {
        this.id = id;
        this.customerCode = customerCode;
        this.phone = phone;
        this.staffCode = staffCode;
        this.content = content;
        this.feedbackDate = feedbackDate;
        this.status = status;
    }

    public Feedback(String customerCode, String phone, String staffCode, String content, Date feedbackDate, String status) {
        this.customerCode = customerCode;
        this.phone = phone;
        this.staffCode = staffCode;
        this.content = content;
        this.feedbackDate = feedbackDate;
        this.status = status;
    }
}
