package com.klef.soa.docker.service;

import java.util.List;

import com.klef.soa.docker.dto.HealthCampRequest;
import com.klef.soa.docker.dto.HealthCampResponse;

public interface HealthCampService
{
    HealthCampResponse addHealthCamp(HealthCampRequest request);

    List<HealthCampResponse> getAllHealthCamps();

    HealthCampResponse getHealthCampById(Long id);

    HealthCampResponse updateHealthCamp(Long id, HealthCampRequest request);

    void deleteHealthCamp(Long id);
}