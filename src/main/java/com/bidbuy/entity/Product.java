package com.bidbuy.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    private String name;
    private String description;
    
    @Column(name = "retail_price")
    private double retailPrice;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    private String brand;
    private String category;
    private boolean featured;
}