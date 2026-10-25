package com.klef.soa.docker.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class HealthCampRequest
{
    @NotBlank(message = "Camp name is required")
    private String campName;

    @NotBlank(message = "Participant name is required")
    private String participantName;

    @NotNull(message = "Age is required")
    @Min(value = 1, message = "Age must be at least 1")
    @Max(value = 120, message = "Age cannot exceed 120")
    private Integer age;

    @NotNull(message = "Attendance status is required")
    private Boolean attended;
}