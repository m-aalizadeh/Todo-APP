package com.maryamaalizadeh.modo.exception;

public class StorageFileNotFoundException extends RuntimeException{
    private String message;

    public StorageFileNotFoundException() {
    }

    public StorageFileNotFoundException(String message) {
        super(message);
        this.message = message;
    }
}
