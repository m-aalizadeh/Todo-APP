package com.maryamaalizadeh.modo.controller;

import com.maryamaalizadeh.modo.model.Todo;
import com.maryamaalizadeh.modo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/app/todo")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @PostMapping("/createTask")
    public Todo createTodo(@RequestBody Todo todo){
        return  todoService.createTodo(todo);
    }
}
