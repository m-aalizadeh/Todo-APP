package com.maryamaalizadeh.modo.service;

import com.maryamaalizadeh.modo.constants.ExceptionConstants;
import com.maryamaalizadeh.modo.exception.StorageException;
import com.maryamaalizadeh.modo.model.File;
import com.maryamaalizadeh.modo.repository.FileRepository;
import com.maryamaalizadeh.modo.payload.UploadFileResponse;
import com.maryamaalizadeh.modo.util.MD5Util;

import java.io.IOException;
import java.net.MalformedURLException;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileServiceImpl implements FileService{

    @Autowired
    private FileRepository fileRepository;

    @Override
    public UploadFileResponse saveFile(MultipartFile file, String userId) {
        File returnFile = null;
        UploadFileResponse uploadFileResponse = new UploadFileResponse();
        try {
            if(file.isEmpty()){
                throw new StorageException(ExceptionConstants.EMPTY_FILE_ERROR);
            }
            File f = new File(file.getOriginalFilename(), file.getContentType(), file.getSize(),
                    new Binary(file.getBytes()));
            f.setUserId(userId);
            f.setMd5(MD5Util.getMD5(file.getInputStream()));
            returnFile = fileRepository.save(f);
            uploadFileResponse.setMessage("File Uploaded Successfully");
            uploadFileResponse.setFileId(returnFile.getId().toString());
            return uploadFileResponse;
        } catch (IOException | NoSuchAlgorithmException ex) {
            throw new StorageException(ExceptionConstants.FILE_STORAGE_ERROR);
        }
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
