package com.maryamaalizadeh.modo.service;

import com.maryamaalizadeh.modo.model.LoadFile;
import com.maryamaalizadeh.modo.payload.UploadFileResponse;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FileService {

    @Autowired
    private GridFsTemplate template;

    @Autowired
    private GridFsOperations operations;

    public UploadFileResponse addFile(String userId, MultipartFile upload)throws IOException{
        DBObject metaData = new BasicDBObject();
        metaData.put("fileSize", upload.getSize());
        metaData.put("userId", userId);
        Object fileID = template.store(upload.getInputStream(), upload.getOriginalFilename(),
                upload.getContentType(), metaData);

        UploadFileResponse uploadFileResponse = new UploadFileResponse();
        uploadFileResponse.setMessage("File Uploaded Successfully");
        uploadFileResponse.setFileId(fileID.toString());
        return uploadFileResponse;
    }

    public LoadFile downloadFile(String userId) throws IOException {

        GridFSFile gridFSFile = template.findOne( new Query(Criteria.where("metadata.userId").is(userId)) );

        LoadFile loadFile = new LoadFile();

        if (gridFSFile != null && gridFSFile.getMetadata() != null) {
            loadFile.setFileName( gridFSFile.getFilename() );

            loadFile.setFileType( gridFSFile.getMetadata().get("_contentType").toString() );

            loadFile.setFileSize( gridFSFile.getMetadata().get("fileSize").toString() );
            loadFile.setFile(IOUtils.toByteArray(operations.getResource(gridFSFile).getInputStream()));
        }

        return loadFile;
    }

}
