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
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin/care/feedbacks")
@CrossOrigin(origins = "*")
public class FeedbackController {
    private FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping
    public FeedbackResponse createFeedback(@RequestBody Feedback feedback) throws ParseException {
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
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "20") int size
            ) throws ParseException {
        return feedbackService.listFeedback(searchText, page, size);
    }

    @GetMapping("/customer/{code}")
    public List<Feedback> findByCustomerCode(@PathVariable String code){
        return feedbackService.findByCustomerCode(code);
    }
}
