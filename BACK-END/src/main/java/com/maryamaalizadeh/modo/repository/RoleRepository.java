package com.maryamaalizadeh.modo.repository;

import com.maryamaalizadeh.modo.model.Role;
import com.maryamaalizadeh.modo.model.RoleName;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends CrudRepository<Role,String> {
    Role findByRoleName(RoleName roleName);
}
