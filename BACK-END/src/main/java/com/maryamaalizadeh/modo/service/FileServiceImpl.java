package com.maryamaalizadeh.modo.service;

import com.maryamaalizadeh.modo.constants.ExceptionConstants;
import com.maryamaalizadeh.modo.exception.StorageException;
import com.maryamaalizadeh.modo.model.File;
import com.maryamaalizadeh.modo.model.User;
import com.maryamaalizadeh.modo.repository.FileRepository;
import com.maryamaalizadeh.modo.payload.UploadFileResponse;
import com.maryamaalizadeh.modo.repository.UserRepository;
import com.maryamaalizadeh.modo.util.MD5Util;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.Objects;
import java.util.Optional;

import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileServiceImpl implements FileService{

    @Autowired
    private FileRepository fileRepository;
    @Autowired
    private UserRepository userRepository;

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
            Optional<User> user = userRepository.findById(userId);
            f.setUser(user.get());
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
        Optional<User> user = userRepository.findById(id);
        return fileRepository.findByUser(user.get());
    }

    @Override
    public UploadFileResponse updateFile(MultipartFile file, String fileId) {
        try {
            if(fileId == null || fileId ==""){
                throw new StorageException(ExceptionConstants.MISSING_FILE_ID);
            }else if(Objects.isNull(file) || file.toString().equals("{}")){
                throw new StorageException(ExceptionConstants.EMPTY_REQUEST_BODY);
            }else {
                Optional<File> file1 = fileRepository.findById(fileId);
                if(!fileRepository.existsById(fileId)){
                    throw new StorageException(ExceptionConstants.FILE_NOT_FOUND);
                }else if(file1.get().getContent().equals(new Binary(file.getBytes()))){
                    throw new StorageException(ExceptionConstants.FILE_ALREADY_EXIST);
                }else {
                    File updatedFile = new File(file.getOriginalFilename(), file.getContentType(), file.getSize(),
                            new Binary(file.getBytes()));
                    updatedFile.setId(fileId);
                    updatedFile.setMd5(MD5Util.getMD5(file.getInputStream()));
                    File persistedFile = fileRepository.save(updatedFile);
                    UploadFileResponse uploadFileResponse = new UploadFileResponse();
                    uploadFileResponse.setMessage("File Updated Successfully");
                    uploadFileResponse.setFileId(persistedFile.getId());
                    return uploadFileResponse;
                }
            }
        }catch (IOException | NoSuchAlgorithmException ex){
            throw new StorageException(ExceptionConstants.FILE_STORAGE_ERROR);
        }
    }


}
