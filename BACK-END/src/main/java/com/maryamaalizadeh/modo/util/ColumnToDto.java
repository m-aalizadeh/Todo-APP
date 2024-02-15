package com.maryamaalizadeh.modo.util;

import com.maryamaalizadeh.modo.model.Column;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ColumnToDto {

    public Column convertToDto(Optional<Column> column){
        Column columnDto = new Column();
        columnDto.setId(column.get().getId());
        columnDto.setTitle(column.get().getTitle());
        columnDto.setDescription(column.get().getDescription());
        columnDto.setUser(column.get().getUser());
        return columnDto;
    }
}
