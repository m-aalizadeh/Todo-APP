package com.maryamaalizadeh.modo.repository;

import com.maryamaalizadeh.modo.model.File;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FileRepository extends MongoRepository<File, String> {

    Optional<File> findByUserId(String userId);
}
