package com.bidbuy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseResponse {
    private String id;
    private String packageId;
    private String userId;
    private int bidCount;
    private double amount;
    private LocalDateTime purchaseDate;
}