package com.sapo.edu.demo.entities;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Table(name = "customer")
@Data
public class Customer {
    @Id
    @Size(max = 8)
    private String code;
    @Column
    @NotNull
    @Size(max = 100)
    private String name;
    @Column
    @Size(max = 100)
    private String email;
    @Column(unique = true)
    @NotNull
    @Size(max = 10)
    private String phone;
    @Column(name = "last_contact")
    private Date lastContact;

    public Customer() {
    }

    public Customer(String code, String name, String email, String phone, Date lastContact) {
        this.code = code;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.lastContact = lastContact;
    }

    public Customer(String name, String email, String phone, Date lastContact) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.lastContact = lastContact;
    }
}
