package com.maryamaalizadeh.modo.exception;

import com.maryamaalizadeh.modo.constants.ExceptionConstants;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @Value(value = "${data.exception.message1}")
    private String message1;
    @Value(value = "${data.exception.message2}")
    private String message2;
    @Value(value = "${data.exception.message3}")
    private String message3;

    @ExceptionHandler(value = TaskNotFoundException.class)
    public ResponseEntity taskNotFoundException(TaskNotFoundException taskNotFoundException){
        return new ResponseEntity<String>(ExceptionConstants.TASK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = InternalServerException.class)
    public ResponseEntity databaseConnectionFailsException(Exception exception){
        return new ResponseEntity<String>(ExceptionConstants.INTERNAL_SERVICE_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = BadRequestHandler.class)
    public ResponseEntity badRequestHandler(BadRequestHandler badRequestHandler){
        return new ResponseEntity<String>(ExceptionConstants.TASK_NO_TITLE, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = TaskAlreadyExists.class)
    public ResponseEntity taskAlreadyExistsException(TaskAlreadyExists taskAlreadyExists){
        return new ResponseEntity<String>(ExceptionConstants.TASK_ALREADY_EXIST, HttpStatus.CONFLICT);
    }

//    @ExceptionHandler(value = BadRequestHandler.class)
//    public ResponseEntity taskTitleValidation(BadRequestHandler badRequestHandler){
//        return new ResponseEntity<String>(ExceptionConstants.TASK_NO_TITLE, HttpStatus.INTERNAL_SERVER_ERROR);
//    }


}
