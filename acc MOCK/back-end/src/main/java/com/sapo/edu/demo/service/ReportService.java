package com.sapo.edu.demo.service;

import com.sapo.edu.demo.entities.Report;
import com.sapo.edu.demo.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class ReportService {

    ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public Report createReport(Report report){
        return reportRepository.save(report);
    }

}
