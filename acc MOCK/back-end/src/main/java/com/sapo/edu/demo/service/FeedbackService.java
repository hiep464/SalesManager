package com.sapo.edu.demo.service;

import com.sapo.edu.demo.entities.Customer;
import com.sapo.edu.demo.entities.Feedback;
import com.sapo.edu.demo.exception.NotFoundException;
import com.sapo.edu.demo.repository.CustomerRepository;
import com.sapo.edu.demo.repository.FeedbackRepository;
import com.sapo.edu.demo.response.FeedbackResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Objects;
import java.util.Optional;

@Service
public class FeedbackService {
    private FeedbackRepository feedbackRepository;
    private CustomerRepository customerRepository;

    public FeedbackService(FeedbackRepository feedbackRepository, CustomerRepository customerRepository) {
        this.feedbackRepository = feedbackRepository;
        this.customerRepository = customerRepository;
    }

    public FeedbackResponse createFeedback(Feedback feedback) throws ParseException {
        DateTimeFormatter customFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDate = customFormatter.format(LocalDateTime.now());
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = dateFormat.parse(formattedDate);
        feedback.setFeedbackDate(date);
        Feedback createFeedback = feedbackRepository.save(feedback);
        FeedbackResponse response = new FeedbackResponse();
        response.setFeedback(createFeedback);
        response.setMessage("Create feedback success");
        Customer customer = customerRepository.findByCode(feedback.getCustomerCode());
        if(!Objects.equals(customer.getCode(), feedback.getCustomerCode())){
            throw new NotFoundException("Customer not found");
        }else {
            if (!Objects.equals(customer.getPhone(), feedback.getPhone())){
                throw new NotFoundException("Customer not found");
            }else {
                return response;
            }
        }
    }

    public FeedbackResponse updateFeedback(Integer id,Feedback feedback){
        feedback.setId(id);
        feedback.setStatus("S2");
        Feedback updateFeedback = feedbackRepository.save(feedback);
        FeedbackResponse response = new FeedbackResponse();
        response.setFeedback(updateFeedback);
        response.setMessage("Update feedback success");
        return response;
    }

    public Optional<Feedback> getFeedbackById(Integer id) throws NotFoundException {
        Optional<Feedback> feedback=feedbackRepository.findById(id);
        if(feedback.isEmpty()) {
            throw new NotFoundException("Cann't find feedback!");
        }
        else {
            return feedback;
        }
    }

    public void deleteFeedback(Integer id) throws NotFoundException{
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Feedback not found"));
        feedbackRepository.delete(feedback);
    }

    public Page<Feedback> listFeedback(String searchText, int page, int size) throws ParseException {
        Pageable pageable = PageRequest.of(page, size);
        return feedbackRepository.findByCustomerCodeContainingOrPhoneContainingOrderByStatusAscFeedbackDateAsc( searchText, searchText, pageable);
    }
}
