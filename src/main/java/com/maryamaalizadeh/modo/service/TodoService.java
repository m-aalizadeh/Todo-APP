package com.maryamaalizadeh.modo.service;

import com.maryamaalizadeh.modo.model.Todo;
import com.maryamaalizadeh.modo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    public Todo createTodo(Todo todo){
        return todoRepository.save(todo);
    }

    public List<Todo> getAllTodos(){
        return (List<Todo>) todoRepository.findAll();
    }

    public String deleteTodo(String id){
        todoRepository.deleteById(id);
        return "Task removed successfully!";
    }
}
