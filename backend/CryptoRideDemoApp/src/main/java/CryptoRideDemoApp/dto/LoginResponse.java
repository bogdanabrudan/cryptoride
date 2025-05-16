package CryptoRideDemoApp.dto;

import lombok.*;

@Data
@AllArgsConstructor
public class LoginResponse {
    private Integer userId;
    private String username;
    private String role;
    private Integer balance;
}
