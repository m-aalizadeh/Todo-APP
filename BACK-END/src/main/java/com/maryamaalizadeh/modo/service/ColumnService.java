package com.maryamaalizadeh.modo.service;

import com.maryamaalizadeh.modo.constants.ExceptionConstants;
import com.maryamaalizadeh.modo.dto.ColumnDTO;
import com.maryamaalizadeh.modo.exception.*;
import com.maryamaalizadeh.modo.model.Column;
import com.maryamaalizadeh.modo.model.User;
import com.maryamaalizadeh.modo.payload.DeleteResponse;
import com.maryamaalizadeh.modo.repository.ColumnRepository;
import com.maryamaalizadeh.modo.repository.UserRepository;
import com.maryamaalizadeh.modo.util.ColumnToDto;
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
public class ColumnService {

    private final static Logger LOGGER = LoggerFactory.getLogger(TodoService.class);

    @Autowired
    private ColumnRepository columnRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ColumnToDto columnToDto;

    public ResponseEntity<?> createColumn(Column column, String userId){
        LOGGER.info("Started to create new todo: {}", column.toString());
        if(Objects.isNull(column)){
            throw new BadRequestHandler(ExceptionConstants.EMPTY_REQUEST_BODY);
        }else if(column.getTitle() == null){
            throw new BadRequestHandler(ExceptionConstants.TITLE_IS_MISSING);
        }else {
            Optional<Column> column1 = Optional.ofNullable(columnRepository.findByTitle(column.getTitle()));
            if(column1.isPresent()){
                throw new TaskAlreadyExists(ExceptionConstants.DUPLICATE_COLUMN);
            }else {
                Optional<User> user = userRepository.findById(userId);
                column.setUser(user.get());
                Optional<Column> newColumn = Optional.of(columnRepository.save(column));
                if(newColumn != null && !newColumn.isEmpty() && newColumn.get().getId() != null){
                    LOGGER.info("Todo created successfully: {}", newColumn.get().toString());
                    return new ResponseEntity<>(newColumn, HttpStatus.OK);
                }else {
                    throw new InternalServerException(ExceptionConstants.FAILED_CREATE_COLUMN);
                }
            }
        }
    }

    public Page<Column> getAllColumns(Integer offset, Integer limit, String userId){
        LOGGER.info("Started to fetch all columns");
        Pageable pageable = PageRequest.of(offset, limit, Sort.Direction.DESC, "createdAt");
        Page<Column> columns =  columnRepository.findByUserId(userId, pageable);
        return columns;
    }

    public DeleteResponse deleteColumn(String id){
        LOGGER.info("Started to delete column with id: {}", id);
        if(id == null || id == ""){
            throw new BadRequestHandler(ExceptionConstants.MISSING_MANDATORY_ID);
        }else {
            Optional<Column> todo = columnRepository.findById(id);
            if(todo.isEmpty() || todo == null){
                LOGGER.info("Todo with id: {} does not exist", id);
                throw new TaskNotFoundException();
            }else {
                columnRepository.deleteById(id);
                LOGGER.info("Todo with id {} removed successfully", id);
                return new DeleteResponse("Column removed successfully!", "success");
            }
        }
    }

    public ResponseEntity<?> updateColumn(@PathVariable String id, @RequestBody ColumnDTO columnDto){
        LOGGER.info("Started to update column with id {} and details {}", id, columnDto.toString());
        if(id == null || id == ""){
            LOGGER.info("Missing mandatory field id");
            throw new BadRequestHandler(ExceptionConstants.MISSING_MANDATORY_ID);
        }else if(Objects.isNull(columnDto) || columnDto.toString().equals("{}")){
            LOGGER.info("Body is mandatory for todo update");
            throw new BadRequestHandler(ExceptionConstants.EMPTY_REQUEST_BODY);
        }else{
            Optional<Column> column = columnRepository.findById(id);
            Boolean needUpdate = false;
            if(column == null || column.isEmpty()){
                LOGGER.info("Column with id: {} does not exist", id);
                throw new ColumnNotFoundException();
            }else {
                if(columnDto.getTitle() != null && !columnDto.getTitle().equals(column.get().getTitle())){
                    column.get().setTitle(columnDto.getTitle());
                    needUpdate = true;
                }
                if(columnDto.getUser() != null && !columnDto.getUser().equals(column.get().getUser())) {
                    column.get().setUser(columnDto.getUser());
                    needUpdate = true;
                }
            }
            if(needUpdate){
                Column todoDto1 = columnToDto.convertToDto(column);
                LOGGER.info("Todo updated successfully {}", todoDto1);
                return new ResponseEntity<>(columnRepository.save(todoDto1), HttpStatus.OK);
            }else {
                throw new BadRequestHandler(ExceptionConstants.DATA_WITH_OUT_CHANGE);
            }
        }
    }
}
