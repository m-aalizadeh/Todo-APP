package com.maryamaalizadeh.modo.payload;

public class DeleteResponse {
    private String message;
    private String status;

    public DeleteResponse() {
    }

    public DeleteResponse(String message, String status) {
        this.message = message;
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
