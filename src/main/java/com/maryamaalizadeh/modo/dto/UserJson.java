package com.maryamaalizadeh.modo.dto;

public class UserJson {
    private String email;
    private String userId;
    private String accessToken;

    private String tokenType;

    public UserJson(String email, String userId, String accessToken, String tokenType) {
        this.email = email;
        this.userId = userId;
        this.accessToken = accessToken;
        this.tokenType = tokenType;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
}
