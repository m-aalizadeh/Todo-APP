package com.maryamaalizadeh.modo.service;

import com.maryamaalizadeh.modo.model.File;
import com.maryamaalizadeh.modo.repository.FileRepository;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FileServiceImpl implements FileService{

    @Autowired
    private FileRepository fileRepository;

    @Override
    public File saveFile(File file) {
        return fileRepository.save(file);
    }

    @Override
    public void removeFile(String id) {
        fileRepository.deleteById(id);
    }

    @Override
    public Optional<File> getFileByUserId(String id) {
        return fileRepository.findByUserId(id);
    }

}
