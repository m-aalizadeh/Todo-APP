package com.maryamaalizadeh.modo.util;

import com.maryamaalizadeh.modo.model.Todo;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class EntityToDto {

    public Todo convertToDto(Optional<Todo> todo){
        Todo todoDto = new Todo();
        todoDto.setId(todo.get().getId());
        todoDto.setTitle(todo.get().getTitle());
        todoDto.setDescription(todo.get().getDescription());
        todoDto.setDueDate(todo.get().getDueDate());
        todoDto.setPriority(todo.get().getPriority());
        todoDto.setStatus(todo.get().getStatus());
        todoDto.setColumn(todo.get().getColumn());
        return todoDto;
    }
}
