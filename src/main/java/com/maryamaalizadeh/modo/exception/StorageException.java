package com.maryamaalizadeh.modo.exception;

public class StorageException extends RuntimeException{
    private String message;

    public StorageException() {
    }

    public StorageException(String message) {
        super(message);
        this.message = message;
    }
}
