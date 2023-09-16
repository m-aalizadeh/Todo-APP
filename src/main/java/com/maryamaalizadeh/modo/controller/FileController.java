package com.maryamaalizadeh.modo.controller;

import com.maryamaalizadeh.modo.constants.ExceptionConstants;
import com.maryamaalizadeh.modo.exception.StorageException;
import com.maryamaalizadeh.modo.model.File;
import com.maryamaalizadeh.modo.payload.UploadFileResponse;
import com.maryamaalizadeh.modo.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.UnsupportedEncodingException;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/app/v1/file")
public class FileController {

    @Autowired
    private FileService fileService;

    @Value("${server.address}")
    private String serverAddress;

    @Value("${server.port}")
    private String serverPort;

    @PostMapping("/upload/{userId}")
    @ResponseBody
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file, @PathVariable String userId) {
        UploadFileResponse response = fileService.saveFile(file, userId);
        if(response.getFileId() != null){
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/view/{id}")
    @ResponseBody
    public ResponseEntity<Object> serveFileOnline(@PathVariable String id) {
        Optional<File> file = fileService.getFileByUserId(id);
        if (file.isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.OK).body(file);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new StorageException(ExceptionConstants.FILE_READ_ERROR));
        }

    }

//    @PostMapping("/")
//    public String handleFileUpload(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) {
//
//        try {
//            File f = new File(file.getOriginalFilename(), file.getContentType(), file.getSize(),
//                    new Binary(file.getBytes()));
//            f.setMd5(MD5Util.getMD5(file.getInputStream()));
//            fileService.saveFile(f);
//        } catch (IOException | NoSuchAlgorithmException ex) {
//            ex.printStackTrace();
//            redirectAttributes.addFlashAttribute("message", "Your " + file.getOriginalFilename() + " is wrong!");
//            return "redirect:/";
//        }
//
//        redirectAttributes.addFlashAttribute("message",
//                "You successfully uploaded " + file.getOriginalFilename() + "!");
//
//        return "redirect:/";
//    }

    @GetMapping("files/{id}")
    @ResponseBody
    public ResponseEntity<Object> serveFile(@PathVariable String id) throws UnsupportedEncodingException {

        Optional<File> file = fileService.getFileByUserId(id);

        if (file.isPresent()) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; fileName=" + new String(file.get().getName().getBytes("utf-8"),"ISO-8859-1"))
                    .header(HttpHeaders.CONTENT_TYPE, "application/octet-stream")
                    .header(HttpHeaders.CONTENT_LENGTH, file.get().getSize() + "").header("Connection", "close")
                    .body(file.get().getContent().getData());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("File was not fount");
        }

    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<String> deleteFile(@PathVariable String id) {
        try {
            fileService.removeFile(id);
            return ResponseEntity.status(HttpStatus.OK).body("File deleted Successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
