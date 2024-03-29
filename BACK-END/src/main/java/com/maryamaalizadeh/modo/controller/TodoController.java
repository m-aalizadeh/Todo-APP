package com.maryamaalizadeh.modo.controller;

import com.maryamaalizadeh.modo.constants.ControllerConstants;
import com.maryamaalizadeh.modo.dto.TodoDto;
import com.maryamaalizadeh.modo.model.Todo;
import com.maryamaalizadeh.modo.payload.DeleteResponse;
import com.maryamaalizadeh.modo.payload.PagedResponse;
import com.maryamaalizadeh.modo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/app/v1")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @PostMapping("/todo/{columnId}")
    public ResponseEntity<?> createTodo(@RequestBody Todo todo, @PathVariable String columnId){
        return  todoService.createTodo(todo, columnId);
    }

    @GetMapping("/todos/{id}")
    public PagedResponse<Todo> getAllTodos(@PathVariable String id, @RequestParam(value = "offset", defaultValue = ControllerConstants.DEFAULT_PAGE_NUMBER) Integer offset,
                                  @RequestParam(value = "limit", defaultValue = ControllerConstants.DEFAULT_PAGE_SIZE) Integer limit){
        Page<Todo> todos = todoService.getAllTodos(offset, limit, id);
        if(todos.getTotalElements() == 0){
            return new PagedResponse<>(Collections.emptyList(), todos.getNumber(),
                    todos.getSize(), todos.getTotalElements(), todos.getTotalPages(), todos.isLast());
        }

        return new PagedResponse<>(todos.getContent(), todos.getNumber(),
                todos.getSize(), todos.getTotalElements(), todos.getTotalPages(), todos.isLast());
    }

    @DeleteMapping("/todo/delete/{id}")
    public DeleteResponse deleteTodo(@PathVariable String id){
        return todoService.deleteTodo(id);
    }

    @PatchMapping("/todo/update/{id}")
    public ResponseEntity<?> updateTodo(@PathVariable String id, @RequestBody TodoDto todoDto){
        return todoService.updateTodo(id, todoDto);
    }
}
