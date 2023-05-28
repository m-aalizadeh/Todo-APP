package com.maryamaalizadeh.modo.controller;

import com.maryamaalizadeh.modo.dto.TodoDto;
import com.maryamaalizadeh.modo.model.Todo;
import com.maryamaalizadeh.modo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/app/v1")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @PostMapping("/todo")
    public ResponseEntity<?> createTodo(@RequestBody Todo todo){
        return  todoService.createTodo(todo);
    }

    @GetMapping("/todos")
    public List<Todo> getAllTodos(){ return todoService.getAllTodos();}

    @DeleteMapping("/todo/{id}")
    public String deleteTodo(@PathVariable String id){
        return todoService.deleteTodo(id);
    }

    @PatchMapping("/todo/{id}")
    public ResponseEntity<?> updateTodo(@PathVariable String id, @RequestBody TodoDto todoDto){
        return todoService.updateTodo(id, todoDto);
    }
}
