package com.maryamaalizadeh.modo.repository;

import com.maryamaalizadeh.modo.model.Todo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends CrudRepository<Todo, String> {

}
