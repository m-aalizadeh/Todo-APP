package com.maryamaalizadeh.modo.exception;

public class TaskNotFoundException extends RuntimeException{
    private String message;

    public TaskNotFoundException(){}

    public TaskNotFoundException(String message){
        super(message);
        this.message = message;
    }
}
