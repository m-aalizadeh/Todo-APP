package com.maryamaalizadeh.modo.service;

import com.maryamaalizadeh.modo.exception.BadRequestHandler;
import com.maryamaalizadeh.modo.exception.TaskAlreadyExists;
import com.maryamaalizadeh.modo.model.Todo;
import com.maryamaalizadeh.modo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    public ResponseEntity<?> createTodo(Todo todo){
        if(Objects.isNull(todo) || Objects.nonNull(todo)){
            throw new BadRequestHandler();
        }else {
            Optional<Todo> todo1 = Optional.ofNullable(todoRepository.findByTitle(todo.getTitle()));
            if(todo1.isPresent()){
                throw new TaskAlreadyExists();
            }else {
                Optional<Todo> createdTask = Optional.of(todoRepository.save(todo));
                if(createdTask != null && !createdTask.isEmpty() && createdTask.get().getId() != null){
                    return new ResponseEntity<>("Task created successfully!", HttpStatus.OK);
                }else {
                    throw new BadRequestHandler();
                }
            }
        }

    }

    public List<Todo> getAllTodos(){
        return (List<Todo>) todoRepository.findAll();
    }

    public String deleteTodo(String id){
        todoRepository.deleteById(id);
        return "Task removed successfully!";
    }
}
