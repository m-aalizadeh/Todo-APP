package com.maryamaalizadeh.modo.repository;

import com.maryamaalizadeh.modo.model.Column;
import com.maryamaalizadeh.modo.model.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ColumnRepository extends CrudRepository<Column, String > {
    Column findByTitle(String title);
    Page<Column> findAll(Pageable pageable);

    Page<Column> findByUserId(String userId, Pageable pageable);
}
