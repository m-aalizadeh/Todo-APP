package com.maryamaalizadeh.modo.batch;

import com.maryamaalizadeh.modo.model.Todo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.item.ItemProcessor;

public class TodoDataProcessor implements ItemProcessor<TodoInput, Todo> {

    private static final Logger logger = LoggerFactory.getLogger(TodoDataProcessor.class);

    @Override
    public Todo process(TodoInput todoItem) throws Exception {
        logger.info("processing todo data.....{}", todoItem);
        Todo todo = new Todo();
        todo.setUserId(todoItem.getUserId());
        todo.setTitle(todoItem.getTitle());
        todo.setDescription(todoItem.getDescription());
        todo.setDueDate(todoItem.getDueDate());
        todo.setPriority(todoItem.getPriority());
        todo.setStatus(todoItem.getStatus());
        return todo;
    }
}
