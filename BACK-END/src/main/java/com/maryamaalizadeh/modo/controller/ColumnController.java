package com.maryamaalizadeh.modo.controller;

import com.maryamaalizadeh.modo.constants.ControllerConstants;
import com.maryamaalizadeh.modo.dto.ColumnDTO;
import com.maryamaalizadeh.modo.model.Column;
import com.maryamaalizadeh.modo.payload.DeleteResponse;
import com.maryamaalizadeh.modo.payload.PagedResponse;
import com.maryamaalizadeh.modo.service.ColumnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/app/v1")
public class ColumnController {

    @Autowired
    private ColumnService columnService;

    @PostMapping("/column/{userId}")
    public ResponseEntity<?> createColumn(@RequestBody Column column, @PathVariable String userId){
        return  columnService.createColumn(column, userId);
    }

    @GetMapping("/column/{id}")
    public PagedResponse<Column> getAllColumn(@PathVariable String id, @RequestParam(value = "offset", defaultValue = ControllerConstants.DEFAULT_PAGE_NUMBER) Integer offset,
                                           @RequestParam(value = "limit", defaultValue = ControllerConstants.DEFAULT_PAGE_SIZE) Integer limit){
        Page<Column> columns = columnService.getAllColumns(offset, limit, id);
        if(columns.getTotalElements() == 0){
            return new PagedResponse<>(Collections.emptyList(), columns.getNumber(),
                    columns.getSize(), columns.getTotalElements(), columns.getTotalPages(), columns.isLast());
        }

        return new PagedResponse<>(columns.getContent(), columns.getNumber(),
                columns.getSize(), columns.getTotalElements(), columns.getTotalPages(), columns.isLast());
    }

    @DeleteMapping("/column/delete/{id}")
    public DeleteResponse deleteColumn(@PathVariable String id){
        return columnService.deleteColumn(id);
    }

    @PatchMapping("/column/update/{id}")
    public ResponseEntity<?> updateColumn(@PathVariable String id, @RequestBody ColumnDTO columnDTO){
        return columnService.updateColumn(id, columnDTO);
    }
}
