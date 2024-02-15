package com.maryamaalizadeh.modo.exception;

public class BadRequestHandler extends RuntimeException{
        private String message;

        public BadRequestHandler(){
        }

        public BadRequestHandler(String message){
            super(message);
            this.message = message;
        }

}
