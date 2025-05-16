package CryptoRideDemoApp.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RentRequest {
    private Long clientId;
    private Long carId;
    private LocalDate pickupDay;
    private LocalDate returnDay;
    private Integer totalCost;
}
