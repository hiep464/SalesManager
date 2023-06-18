package com.sapo.edu.demo.response;

import com.sapo.edu.demo.entities.Customer;
import lombok.Data;

@Data
public class CustumerResponse {
   private String message;

   private Customer customer;

   public CustumerResponse() {
   }
}
