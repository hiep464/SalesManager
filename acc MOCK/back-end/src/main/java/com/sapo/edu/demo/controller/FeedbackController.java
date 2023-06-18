package com.sapo.edu.demo.controller;

import com.sapo.edu.demo.entities.Feedback;
import com.sapo.edu.demo.response.FeedbackResponse;
import com.sapo.edu.demo.service.FeedbackService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/admin/feedbacks")
@CrossOrigin(origins = "*")
public class FeedbackController {
    private FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping
    public FeedbackResponse createFeedback(@RequestBody Feedback feedback){
        return feedbackService.createFeedback(feedback);
    }

    @PostMapping("/{id}")
    public FeedbackResponse updateFeedback(@PathVariable Integer id , @RequestBody Feedback feedback) throws Throwable {
        return feedbackService.updateFeedback(id,feedback);
    }

    @GetMapping("/{id}")
    public Optional<Feedback> getFeedbackById(@PathVariable Integer id){
        Optional<Feedback> feedback = feedbackService.getFeedbackById(id);
        return feedback;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFeedback(@PathVariable Integer id){
            feedbackService.deleteFeedback(id);
            return ResponseEntity.ok("Delete feedback success");
    }

    @GetMapping
    public Page<Feedback> listFeedback(
            @RequestParam(value = "searchText", required = false, defaultValue = "") String searchText,
            @RequestParam(value = "minDate", required = false, defaultValue ="2010-06-07T01:58:07.000+0000")String minDate,
            @RequestParam(value = "maxDate", required = false, defaultValue = "2023-06-07T01:58:07.000+0000")String maxDate,
            @RequestParam(value = "status", required = false, defaultValue = "Chưa xử lý") String status,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "20") int size
            ) throws ParseException {
        return feedbackService.listFeedback(searchText, minDate, maxDate, status, page, size);
    }
}
