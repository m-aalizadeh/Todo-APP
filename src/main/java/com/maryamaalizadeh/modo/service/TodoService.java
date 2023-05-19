package com.maryamaalizadeh.modo.service;

import com.maryamaalizadeh.modo.model.Todo;
import com.maryamaalizadeh.modo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    public Todo createTodo(Todo todo){
        return todoRepository.save(todo);
    }
}
