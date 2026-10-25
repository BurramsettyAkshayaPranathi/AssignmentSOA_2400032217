package com.klef.soa.docker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HealthCampResponse
{
    private Long id;
    private String campName;
    private String participantName;
    private Integer age;
    private Boolean attended;
}