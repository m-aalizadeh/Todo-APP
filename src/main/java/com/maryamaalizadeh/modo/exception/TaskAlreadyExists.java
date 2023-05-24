package com.maryamaalizadeh.modo.exception;

public class TaskAlreadyExists extends RuntimeException{
    private String message;

    public TaskAlreadyExists(){

    }

    public TaskAlreadyExists(String message){
        super(message);
        this.message = message;
    }
}
