package com.maryamaalizadeh.modo.dto;

import com.maryamaalizadeh.modo.model.User;

public class ColumnDTO {
    private String id;
    private String title;

    private String description;

    private User user;
    public ColumnDTO() {
    }

    public ColumnDTO(String title, String description, User user) {
        this.title = title;
        this.description = description;
        this.user = user;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "ColumnDTO{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
