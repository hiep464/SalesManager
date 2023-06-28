package com.sapo.edu.demo.entities;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@Getter
@Setter
@Table(name = "product")
public class ProductEntity {
    @Id
    private String code;

    @Column
    @NotNull
    private Integer categoryId;

    @Column
    @NotNull
    private String name;

    @Column
    private String image;

    @Column
    private String brand;
    @Column
    private String description;

    @Column
    private String status;

    @Column
    private LocalDate createAt;

    @Column
    private LocalDate updateAt;




    public void setName(String name) {
        this.name = name;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public void setCreateAt(LocalDate createAt) {
        this.createAt = createAt;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setUpdateAt(LocalDate updateAt) {
        this.updateAt = updateAt;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
