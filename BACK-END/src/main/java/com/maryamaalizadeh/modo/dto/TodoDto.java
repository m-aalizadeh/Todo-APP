package com.maryamaalizadeh.modo.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.maryamaalizadeh.modo.model.Column;
import com.maryamaalizadeh.modo.model.Priority;
import com.maryamaalizadeh.modo.model.Status;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.util.Date;

public class TodoDto {

    private String id;
    private String title;
    private String description;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dueDate;
    @Enumerated(EnumType.STRING)
    private Priority priority;
    @Enumerated(EnumType.STRING)
    private Status status;
    private Column column;

    public TodoDto() {
    }

    public TodoDto(String title, String description, Date dueDate, Priority priority, Status status, Column column) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.column = column;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Column getColumn() {
        return column;
    }

    public void setColumn(Column column) {
        this.column = column;
    }
}

