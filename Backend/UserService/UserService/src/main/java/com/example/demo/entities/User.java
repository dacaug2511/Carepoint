package com.example.demo.entities;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "user",
       uniqueConstraints = {
           @UniqueConstraint(name = "uq_user_uname", columnNames = {"uname"}),
           @UniqueConstraint(name = "uq_user_phone", columnNames = {"phone"}),
           @UniqueConstraint(name = "uq_user_email", columnNames = {"email"}),
           @UniqueConstraint(name = "uq_user_adhaar", columnNames = {"aadhaar"})
       })
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer uid;

 
    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "rid", foreignKey = @ForeignKey(name = "fk_user_role"))
    private Role role;

    @Column(name = "uname", nullable = false, length = 50)
    private String uname;

    @Column(name = "firstname", nullable = false, length = 50)
    private String firstName;

    @Column(name = "lastname", nullable = false, length = 50)
    private String lastName;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "phone", nullable = false, length = 15)
    private String phone;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Lob
    @Column(name = "address")
    private String address;

    @Column(name = "aadhaar", length = 12)
    private String aadhaar;

    public User() {
    }

    // Constructor for creating a new user (without uid)
    public User(Role role, String uname, String firstName, String lastName,
                String password, String phone, String email, String address, String aadhaar) {
        this.role = role;
        this.uname = uname;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.aadhaar = aadhaar;
    }

    // All-args constructor
    public User(Integer uid, Role role, String uname, String firstName, String lastName,
                String password, String phone, String email, String address, String aadhaar) {
        this.uid = uid;
        this.role = role;
        this.uname = uname;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.aadhaar = aadhaar;
    }

    // Getters and setters

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    /**
     * When setting password in code ensure you hash it before persisting (do not store plain text).
     */
    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAadhaar() {
        return aadhaar;
    }

    public void setAadhaar(String aadhaar) {
        this.aadhaar = aadhaar;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;
        return Objects.equals(uid, user.uid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(uid);
    }

    @Override
    public String toString() {
        return "User{" +
                "uid=" + uid +
                ", role=" + (role != null ? role.getRid() : null) +
                ", uname='" + uname + '\'' +
                ", firstname='" + firstName + '\'' +
                ", lastname='" + lastName + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", aadhaar='" + aadhaar + '\'' +
                '}';
    }
}