package com.maryamaalizadeh.modo.service;

import com.maryamaalizadeh.modo.model.File;
import com.maryamaalizadeh.modo.payload.UploadFileResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface FileService {

    UploadFileResponse saveFile(MultipartFile file, String userId);
    void removeFile(String id);
    Optional<File> getFileByUserId(String id);

    UploadFileResponse updateFile(MultipartFile file, String fileId);


}
