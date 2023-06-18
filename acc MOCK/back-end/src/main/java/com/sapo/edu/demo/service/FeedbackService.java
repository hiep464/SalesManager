package com.sapo.edu.demo.service;

import com.sapo.edu.demo.entities.Feedback;
import com.sapo.edu.demo.exception.NotFoundException;
import com.sapo.edu.demo.repository.FeedbackRepository;
import com.sapo.edu.demo.response.FeedbackResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@Service
public class FeedbackService {
    private FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public FeedbackResponse createFeedback(Feedback feedback){
            Date date =new Date();
            feedback.setFeedbackDate(date);
            Feedback createFeedback = feedbackRepository.save(feedback);
            FeedbackResponse response = new FeedbackResponse();
            response.setFeedback(createFeedback);
            response.setMessage("Create feedback success");
            return response;
    }

    public FeedbackResponse updateFeedback(Integer id,Feedback feedback){
            feedback.setId(id);
            Feedback updateFeedback = feedbackRepository.save(feedback);
            FeedbackResponse response= new FeedbackResponse();
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

    public Page<Feedback> listFeedback(String searchText, String minDate, String maxDate, String status, int page, int size) throws ParseException {
        Pageable pageable = PageRequest.of(page, size);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
        Date minDateConvert = dateFormat.parse(minDate);
        Date maxDateConvert = dateFormat.parse(maxDate);
        return feedbackRepository.findByCustomerCodeContainingAndFeedbackDateGreaterThanEqualAndFeedbackDateLessThanEqualAndStatusEquals(searchText, minDateConvert, maxDateConvert, status, pageable);
    }
}
