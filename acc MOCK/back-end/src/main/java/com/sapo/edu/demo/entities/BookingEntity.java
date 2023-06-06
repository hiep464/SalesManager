package com.sapo.edu.demo.entities;
import lombok.Data;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Data

@Table(name = "booking")
public class BookingEntity {
    @Id
    private String code;
    @Column
    @NotNull
    @Size(max = 8)
    private String staffCode;
    @Column
    @NotNull
    @Size(max = 8)
    private String supplerCode;
    @Column
    private Long total;
    @Column
    private Date bookingDate;
    @Column
    @NotNull
    @Size(max =50)
    private String payStatus;
    @Column
    @NotNull
    @Size(max = 50)
    private String bookingStatus;
    @Column
    @NotNull
    @Size(max = 50)
    private String status;


}
