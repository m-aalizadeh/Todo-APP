package com.maryamaalizadeh.modo.service;

import com.maryamaalizadeh.modo.constants.ExceptionConstants;
import com.maryamaalizadeh.modo.dto.TodoDto;
import com.maryamaalizadeh.modo.exception.BadRequestHandler;
import com.maryamaalizadeh.modo.exception.TaskAlreadyExists;
import com.maryamaalizadeh.modo.exception.TaskNotFoundException;
import com.maryamaalizadeh.modo.model.Column;
import com.maryamaalizadeh.modo.model.Status;
import com.maryamaalizadeh.modo.model.Todo;
import com.maryamaalizadeh.modo.payload.DeleteResponse;
import com.maryamaalizadeh.modo.repository.ColumnRepository;
import com.maryamaalizadeh.modo.repository.TodoRepository;
import com.maryamaalizadeh.modo.repository.UserRepository;
import com.maryamaalizadeh.modo.util.EntityToDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import java.util.Objects;
import java.util.Optional;

@Service
public class TodoService {

    private final static Logger LOGGER = LoggerFactory.getLogger(TodoService.class);
    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private EntityToDto entityToDto;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ColumnRepository columnRepository;

    public ResponseEntity<?> createTodo(Todo todo, String columnId){
        LOGGER.info("Started to create new todo: {}", todo.toString());
        if(Objects.isNull(todo)){
            throw new BadRequestHandler(ExceptionConstants.EMPTY_REQUEST_BODY);
        }else if(todo.getTitle() == null){
            throw new BadRequestHandler(ExceptionConstants.TASK_NO_TITLE);
        }else {
            Optional<Todo> todo1 = Optional.ofNullable(todoRepository.findByTitle(todo.getTitle()));
            if(todo1.isPresent()){
                throw new TaskAlreadyExists();
            }else {
                Optional<Column> column = columnRepository.findById(columnId);
                todo.setStatus(Status.OPEN);
                todo.setColumn(column.get());
                Optional<Todo> newTask = Optional.of(todoRepository.save(todo));
                if(newTask != null && !newTask.isEmpty() && newTask.get().getId() != null){
                    LOGGER.info("Todo created successfully: {}", newTask.get().toString());
                    return new ResponseEntity<>(newTask, HttpStatus.OK);
                }else {
                    throw new BadRequestHandler();
                }
            }
        }

    }

    public Page<Todo> getAllTodos(Integer offset, Integer limit, String id){
        LOGGER.info("Started to fetch all todos");
        Pageable pageable = PageRequest.of(offset, limit, Sort.Direction.DESC, "createdAt");
         Page<Todo> todos =  todoRepository.findByColumnId(id, pageable);
         return todos;
    }

    public ResponseEntity<?> getTodoById(String id){
        LOGGER.info("Started to get todo by : {}", id);
        if(id == null || id == ""){
            throw new BadRequestHandler(ExceptionConstants.MISSING_MANDATORY_ID);
        }else {
            Optional<Todo> todo = todoRepository.findById(id);
            if(todo.isEmpty() || todo == null){
                LOGGER.info("Todo with id: {} does not exist", id);
                throw new TaskNotFoundException();
            }else {
                LOGGER.info("Todo with id {} found", id);
                return new ResponseEntity<>(todo, HttpStatus.OK);
            }
        }
    }

    public DeleteResponse deleteTodo(String id){
        LOGGER.info("Started to delete todo with id: {}", id);
        if(id == null || id == ""){
            throw new BadRequestHandler(ExceptionConstants.MISSING_MANDATORY_ID);
        }else {
            Optional<Todo> todo = todoRepository.findById(id);
            if(todo.isEmpty() || todo == null){
                LOGGER.info("Todo with id: {} does not exist", id);
                throw new TaskNotFoundException();
            }else {
                todoRepository.deleteById(id);
                LOGGER.info("Todo with id {} removed successfully", id);
                return new DeleteResponse("Task removed successfully!", "success");
                }
            }
        }



    public ResponseEntity<?> updateTodo(@PathVariable String id, @RequestBody TodoDto todoDto){
        LOGGER.info("Started to update todo with id {} and details {}", id, todoDto.toString());
        if(id == null || id == ""){
            LOGGER.info("Missing mandatory field id");
            throw new BadRequestHandler(ExceptionConstants.MISSING_MANDATORY_ID);
        }else if(Objects.isNull(todoDto) || todoDto.toString().equals("{}")){
            LOGGER.info("Body is mandatory for todo update");
            throw new BadRequestHandler(ExceptionConstants.EMPTY_REQUEST_BODY);
        }else{
            Optional<Todo> todo = todoRepository.findById(id);
            Boolean needUpdate = false;
            if(todo == null || todo.isEmpty()){
                System.out.println("todo");
                LOGGER.info("Todo with id: {} does not exist", id);
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
                if(todoDto.getStatus() != null && !todoDto.getStatus().equals(todo.get().getStatus())) {
                    todo.get().setStatus(todoDto.getStatus());
                    needUpdate = true;
                }
                if(todoDto.getColumnId() != null && !todoDto.getColumnId().equals(todo.get().getColumn().getId())) {
                    Optional<Column> column = columnRepository.findById(todoDto.getColumnId());
                    todo.get().setColumn(column.get());
                    needUpdate = true;
                }
            }
            if(needUpdate){
                Todo todoDto1 = entityToDto.convertToDto(todo);
                LOGGER.info("Todo updated successfully {}", todoDto1);
                return new ResponseEntity<>(todoRepository.save(todoDto1), HttpStatus.OK);
            }else {
                throw new BadRequestHandler(ExceptionConstants.DATA_WITH_OUT_CHANGE);
            }
        }
    }
}
