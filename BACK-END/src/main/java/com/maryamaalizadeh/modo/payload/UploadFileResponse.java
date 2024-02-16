package com.maryamaalizadeh.modo.payload;

public class UploadFileResponse {

    private String message;
    private String fileId;

    public UploadFileResponse() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getFileId() {
        return fileId;
    }

    public void setFileId(String fileId) {
        this.fileId = fileId;
    }
}
