package com.sapo.edu.demo.response;

import com.sapo.edu.demo.entities.Feedback;
import lombok.Data;

@Data
public class FeedbackResponse {
    private String message;
    private Feedback feedback;

    public FeedbackResponse() {
    }
}
