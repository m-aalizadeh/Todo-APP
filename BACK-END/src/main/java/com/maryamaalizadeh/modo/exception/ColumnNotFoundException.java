package com.maryamaalizadeh.modo.exception;

public class ColumnNotFoundException extends RuntimeException{
    private String message;

    public ColumnNotFoundException(){}

    public ColumnNotFoundException(String message){
        super(message);
        this.message = message;
    }
}
