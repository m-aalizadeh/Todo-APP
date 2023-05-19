package com.maryamaalizadeh.modo.model;


import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
public class Todo {

    private String id;
    private String title;
    private String description;

    private Date createdDate;

    public Todo() {
    }

    public Todo(String title, String description, Date createdDate) {
        this.title = title;
        this.description = description;
        this.createdDate = createdDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    @Override
    public String toString() {
        return "Todo{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", createdDate=" + createdDate +
                '}';
    }
}
