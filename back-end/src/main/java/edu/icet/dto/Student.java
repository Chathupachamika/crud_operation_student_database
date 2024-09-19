package edu.icet.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String guardianName;
    private String email;
    private String phoneNumber;

    @Lob
    private byte[] profileImage;  // Store the image as Base64 in the database

    public byte[] getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(byte[] bytes) {
        this.profileImage = profileImage;
    }
}
