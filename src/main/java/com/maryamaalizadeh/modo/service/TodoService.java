package com.maryamaalizadeh.modo.service;

import com.maryamaalizadeh.modo.constants.ExceptionConstants;
import com.maryamaalizadeh.modo.dto.TodoDto;
import com.maryamaalizadeh.modo.exception.BadRequestHandler;
import com.maryamaalizadeh.modo.exception.TaskAlreadyExists;
import com.maryamaalizadeh.modo.exception.TaskNotFoundException;
import com.maryamaalizadeh.modo.model.Todo;
import com.maryamaalizadeh.modo.repository.TodoRepository;
import com.maryamaalizadeh.modo.util.EntityToDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private EntityToDto entityToDto;

    public ResponseEntity<?> createTodo(Todo todo){
        if(Objects.isNull(todo)){
            throw new BadRequestHandler(ExceptionConstants.EMPTY_REQUEST_BODY);
        }else if(todo.getTitle() == null){
            throw new BadRequestHandler(ExceptionConstants.TASK_NO_TITLE);
        }else {
            Optional<Todo> todo1 = Optional.ofNullable(todoRepository.findByTitle(todo.getTitle()));
            if(todo1.isPresent()){
                throw new TaskAlreadyExists();
            }else {
                Optional<Todo> newTask = Optional.of(todoRepository.save(todo));
                if(newTask != null && !newTask.isEmpty() && newTask.get().getId() != null){
                    return new ResponseEntity<>("Task created successfully!", HttpStatus.OK);
                }else {
                    throw new BadRequestHandler();
                }
            }
        }

    }

    public Page<Todo> getAllTodos(Integer offset, Integer limit){
        Pageable pageable = PageRequest.of(offset, limit, Sort.Direction.DESC, "createdAt");
         Page<Todo> todos =  todoRepository.findAll(pageable);
         return todos;
    }

    public ResponseEntity<?> getTodoById(String id){
        if(id == null || id == ""){
            throw new BadRequestHandler(ExceptionConstants.MISSING_MANDATORY_ID);
        }else {
            Optional<Todo> todo = todoRepository.findById(id);
            if(todo.isEmpty() || todo == null){
                throw new TaskNotFoundException();
            }else {
                return new ResponseEntity<>(todo, HttpStatus.OK);
            }
        }
    }

    public String deleteTodo(String id){
        if(id == null || id == ""){
            throw new BadRequestHandler(ExceptionConstants.MISSING_MANDATORY_ID);
        }else {
            Optional<Todo> todo = todoRepository.findById(id);
            if(todo.isEmpty() || todo == null){
                throw new TaskNotFoundException();
            }else {
                todoRepository.deleteById(id);
                return "Task removed successfully!";
            }
        }

    }

    public ResponseEntity<?> updateTodo(@PathVariable String id, @RequestBody TodoDto todoDto){
        if(id == null || id == ""){
            throw new BadRequestHandler(ExceptionConstants.MISSING_MANDATORY_ID);
        }else if(Objects.isNull(todoDto) || todoDto.toString().equals("{}")){
            throw new BadRequestHandler(ExceptionConstants.EMPTY_REQUEST_BODY);
        }else{
            Optional<Todo> todo = todoRepository.findById(id);
            Boolean needUpdate = false;
            if(todo == null || todo.isEmpty()){
                throw new TaskNotFoundException();
            }else {
                if(todoDto.getTitle() != null && !todoDto.getTitle().equals(todo.get().getTitle())){
                    todo.get().setTitle(todoDto.getTitle());
                    needUpdate = true;
                }
                if(todoDto.getDescription() != null && !todoDto.getDescription().equals(todo.get().getDescription())){
                    todo.get().setDescription(todoDto.getDescription());
                    needUpdate = true;
                }
                if(todoDto.getDueDate() != null && !todoDto.getDueDate().equals(todo.get().getDueDate())){
                    todo.get().setDueDate(todoDto.getDueDate());
                    needUpdate = true;
                }
                if(todoDto.getPriority() != null && !todoDto.getPriority().equals(todo.get().getPriority())) {
                    todo.get().setPriority(todoDto.getPriority());
                    needUpdate = true;
                }
            }
            if(needUpdate){
                Todo todoDto1 = entityToDto.convertToDto(todo);
                return new ResponseEntity<>(todoRepository.save(todoDto1), HttpStatus.OK);
            }else {
                throw new BadRequestHandler(ExceptionConstants.DATA_WITH_OUT_CHANGE);
            }
        }
    }
}
