package com.bidbuy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BidPackageResponse {
    private String id;
    private String name;
    private int bidCount;
    private double price;
    private double savings;
    private boolean isPopular;
}