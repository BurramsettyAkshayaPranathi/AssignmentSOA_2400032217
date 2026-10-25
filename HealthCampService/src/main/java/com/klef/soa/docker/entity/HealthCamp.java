package com.klef.soa.docker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "health_camp")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HealthCamp
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String campName;

    @Column(nullable = false)
    private String participantName;

    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false)
    private Boolean attended;
}