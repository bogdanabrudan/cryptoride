package CryptoRideDemoApp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "rentals")
public class Rental {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer rentalId;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private User client;

    @Column(name = "pickup_day")
    private LocalDate pickupDay;

    @Column(name = "return_day")
    private LocalDate returnDay;

    private Integer totalCost;
    private String status;
}
