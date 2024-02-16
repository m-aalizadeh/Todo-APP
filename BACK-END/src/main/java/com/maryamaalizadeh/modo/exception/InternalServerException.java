package com.maryamaalizadeh.modo.exception;

public class InternalServerException extends RuntimeException{

    private String message;
    public InternalServerException(){}

    public InternalServerException(String message){
        super(message);
        this.message = message;
    }
}
