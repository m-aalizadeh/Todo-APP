package com.maryamaalizadeh.modo.repository;

import com.maryamaalizadeh.modo.model.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TodoRepository extends CrudRepository<Todo, String> {

    Page<Todo> findAll(Pageable pageable);

    Page<Todo> findByUserId(String userId, Pageable pageable);
    Todo findByTitle(String title);

}
