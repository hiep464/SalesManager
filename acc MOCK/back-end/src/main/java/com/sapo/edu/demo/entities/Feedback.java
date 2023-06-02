package com.sapo.edu.demo.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Table(name = "feedback")
@Data
public class Feedback {
    @Id
    @Column(name = "ID")
    private Integer id;
    @Column(name = "customer_code")
    @NotNull
    private String customerCode;
    @Column(name = "staff_code")
    @NotNull
    private String staffCode;
    @Column
    @NotNull
    @Size(max = 1000)
    private String content;
    @Column(name = "feedback_date")
    private Date feedbackDate;
    @Column
    @NotNull
    @Size(max = 10)
    private String status;

    public Feedback() {
    }

    public Feedback(Integer id, String customerCode, String staffCode, String content, Date feedbackDate, String status) {
        this.id = id;
        this.customerCode = customerCode;
        this.staffCode = staffCode;
        this.content = content;
        this.feedbackDate = feedbackDate;
        this.status = status;
    }

    public Feedback(String customerCode, String staffCode, String content, Date feedbackDate, String status) {
        this.customerCode = customerCode;
        this.staffCode = staffCode;
        this.content = content;
        this.feedbackDate = feedbackDate;
        this.status = status;
    }
}
