package CryptoRideDemoApp.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "ownerships")
public class Ownership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ownershipId;

    @ManyToOne
    @JoinColumn(name = "investor_id")
    @JsonIgnoreProperties({"ownerships", "rentalsAsClient", "password"})
    private User investor;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;

    private Integer percentage;
}
