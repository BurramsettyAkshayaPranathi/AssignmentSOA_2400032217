
package com.klef.soa.docker.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.docker.dto.HealthCampRequest;
import com.klef.soa.docker.dto.HealthCampResponse;
import com.klef.soa.docker.entity.HealthCamp;
import com.klef.soa.docker.repository.HealthCampRepository;
import com.klef.soa.docker.service.HealthCampService;

@Service
public class HealthCampServiceImpl implements HealthCampService
{
    @Autowired
    private HealthCampRepository repository;

    @Override
    public HealthCampResponse addHealthCamp(HealthCampRequest request)
    {
        HealthCamp healthCamp = HealthCamp.builder()
                .campName(request.getCampName())
                .participantName(request.getParticipantName())
                .age(request.getAge())
                .attended(request.getAttended())
                .build();

        HealthCamp savedHealthCamp = repository.save(healthCamp);

        return mapToResponse(savedHealthCamp);
    }

    @Override
    public List<HealthCampResponse> getAllHealthCamps()
    {
        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public HealthCampResponse getHealthCampById(Long id)
    {
        HealthCamp healthCamp = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Health Camp not found with id: " + id));

        return mapToResponse(healthCamp);
    }

    @Override
    public HealthCampResponse updateHealthCamp(
            Long id, HealthCampRequest request)
    {
        HealthCamp healthCamp = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Health Camp not found with id: " + id));

        healthCamp.setCampName(request.getCampName());
        healthCamp.setParticipantName(request.getParticipantName());
        healthCamp.setAge(request.getAge());
        healthCamp.setAttended(request.getAttended());

        HealthCamp updatedHealthCamp = repository.save(healthCamp);

        return mapToResponse(updatedHealthCamp);
    }

    @Override
    public void deleteHealthCamp(Long id)
    {
        HealthCamp healthCamp = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Health Camp not found with id: " + id));

        repository.delete(healthCamp);
    }

    private HealthCampResponse mapToResponse(HealthCamp healthCamp)
    {
        return HealthCampResponse.builder()
                .id(healthCamp.getId())
                .campName(healthCamp.getCampName())
                .participantName(healthCamp.getParticipantName())
                .age(healthCamp.getAge())
                .attended(healthCamp.getAttended())
                .build();
    }
}
