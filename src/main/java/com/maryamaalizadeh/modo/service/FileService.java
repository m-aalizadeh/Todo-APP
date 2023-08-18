package com.maryamaalizadeh.modo.service;

import com.maryamaalizadeh.modo.model.File;

import java.util.Optional;

public interface FileService {

    File saveFile(File file);
    void removeFile(String id);
    Optional<File> getFileByUserId(String id);


}
