package CryptoRideDemoApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    private String username;
    private String password;
    private String role;
    private Integer balance;

    @OneToMany(mappedBy = "client")
    @JsonIgnore
    private List<Rental> rentalsAsClient;

    @OneToMany(mappedBy = "investor")
    @JsonIgnore
    private List<Ownership> ownerships;
}