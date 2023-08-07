package com.maryamaalizadeh.modo.batch;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.maryamaalizadeh.modo.model.Priority;
import com.maryamaalizadeh.modo.model.Status;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.util.Date;

public class TodoInput {
    private String userId;
    private String title;
    private String description;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dueDate;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    @Enumerated(EnumType.STRING)
    private Status status;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
