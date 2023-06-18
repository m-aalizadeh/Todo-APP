package com.maryamaalizadeh.modo.repository;

import com.maryamaalizadeh.modo.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User,String> {
    Boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
}
