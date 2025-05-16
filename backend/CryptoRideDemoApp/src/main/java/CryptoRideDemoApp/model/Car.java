package CryptoRideDemoApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "cars")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer carId;

    private String model;
    private Integer dailyRate;

    @OneToMany(mappedBy = "car")
    @JsonIgnore
    private List<Ownership> ownerships;

    @OneToMany(mappedBy = "car")
    @JsonIgnore
    private List<Rental> rentals;
}
