package com.maryamaalizadeh.modo.controller;

import com.maryamaalizadeh.modo.constants.ControllerConstants;
import com.maryamaalizadeh.modo.dto.TodoDto;
import com.maryamaalizadeh.modo.model.Todo;
import com.maryamaalizadeh.modo.payload.PagedResponse;
import com.maryamaalizadeh.modo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
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
    public PagedResponse<Todo> getAllTodos(@RequestParam(value = "offset", defaultValue = ControllerConstants.DEFAULT_PAGE_NUMBER) Integer offset,
                                  @RequestParam(value = "limit", defaultValue = ControllerConstants.DEFAULT_PAGE_SIZE) Integer limit){
        Page<Todo> todos = todoService.getAllTodos(offset, limit);
        if(todos.getTotalElements() == 0){
            return new PagedResponse<>(Collections.emptyList(), todos.getNumber(),
                    todos.getSize(), todos.getTotalElements(), todos.getTotalPages(), todos.isLast());
        }

        return new PagedResponse<>(todos.getContent(), todos.getNumber(),
                todos.getSize(), todos.getTotalElements(), todos.getTotalPages(), todos.isLast());
    }

    @DeleteMapping("/todo/{id}")
    public String deleteTodo(@PathVariable String id){
        return todoService.deleteTodo(id);
    }

    @PatchMapping("/todo/{id}")
    public ResponseEntity<?> updateTodo(@PathVariable String id, @RequestBody TodoDto todoDto){
        return todoService.updateTodo(id, todoDto);
    }
}
