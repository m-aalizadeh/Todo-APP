package com.maryamaalizadeh.modo.controller;

import com.maryamaalizadeh.modo.model.LoadFile;
import com.maryamaalizadeh.modo.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.ByteArrayResource;
import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("/app/v1/file")
public class FileController {

    @Autowired
    private FileService fileService;

    @PostMapping("/upload/{userId}")
    public ResponseEntity<?> upload(@PathVariable String userId, @RequestParam("file") MultipartFile file)throws IOException{
        return new ResponseEntity<>(fileService.addFile(userId, file), HttpStatus.OK);
    }

    @GetMapping("/download/{userId}")
    public ResponseEntity<ByteArrayResource> download(@PathVariable String userId) throws IOException {
        LoadFile loadFile = fileService.downloadFile(userId);
        System.out.println(loadFile);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(loadFile.getFileType() ))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + loadFile.getFileName() + "\"")
                .body(new ByteArrayResource(loadFile.getFile()));
    }
}
