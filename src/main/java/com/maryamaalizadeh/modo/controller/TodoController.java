package com.maryamaalizadeh.modo.controller;

import com.maryamaalizadeh.modo.model.Todo;
import com.maryamaalizadeh.modo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/app/todo")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @PostMapping("/createTask")
    public ResponseEntity<?> createTodo(@RequestBody Todo todo){
        return  todoService.createTodo(todo);
    }

    @GetMapping("/todos")
    public List<Todo> getAllTodos(){ return todoService.getAllTodos();}

    @DeleteMapping("/{id}")
    public String deleteTodo(@PathVariable String id){
        return todoService.deleteTodo(id);
    }
}
