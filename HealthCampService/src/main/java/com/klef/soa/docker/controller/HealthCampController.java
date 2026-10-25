
package com.klef.soa.docker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.soa.docker.dto.HealthCampRequest;
import com.klef.soa.docker.dto.HealthCampResponse;
import com.klef.soa.docker.service.HealthCampService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/healthcamp")
@CrossOrigin(origins = "*")
public class HealthCampController
{
    @Autowired
    private HealthCampService service;

    @GetMapping("/")
    public String home()
    {
        return "Health Camp Registration System";
    }

    @PostMapping("/add")
    public ResponseEntity<HealthCampResponse> addHealthCamp(
            @Valid @RequestBody HealthCampRequest request)
    {
        return new ResponseEntity<>(
                service.addHealthCamp(request), HttpStatus.CREATED);
    }

    @GetMapping("/displayall")
    public ResponseEntity<List<HealthCampResponse>> getAllHealthCamps()
    {
        return ResponseEntity.ok(service.getAllHealthCamps());
    }

    @GetMapping("/display/{id}")
    public ResponseEntity<HealthCampResponse> getHealthCampById(
            @PathVariable Long id)
    {
        return ResponseEntity.ok(service.getHealthCampById(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<HealthCampResponse> updateHealthCamp(
            @PathVariable Long id,
            @Valid @RequestBody HealthCampRequest request)
    {
        return ResponseEntity.ok(
                service.updateHealthCamp(id, request));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteHealthCamp(
            @PathVariable Long id)
    {
        service.deleteHealthCamp(id);
        return ResponseEntity.ok("Health Camp deleted successfully.");
    }
}
