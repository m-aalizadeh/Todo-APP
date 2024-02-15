package com.maryamaalizadeh.modo.repository;

import com.maryamaalizadeh.modo.model.File;
import com.maryamaalizadeh.modo.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FileRepository extends MongoRepository<File, String> {

    Optional<File> findByUser(User user);
}
