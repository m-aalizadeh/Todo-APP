package com.maryamaalizadeh.modo.payload;

import java.util.List;

public class PagedResponse<T>{
    private List<T> content;
    private Integer offset;
    private Integer limit;
    private Long totalElements;
    private Integer totalPages;
    private Boolean last;

    public PagedResponse() {
    }

    public PagedResponse(List<T> content, Integer offset, Integer limit,
                         Long totalElements, Integer totalPages, Boolean last) {
        this.content = content;
        this.offset = offset;
        this.limit = limit;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.last = last;
    }

    public List<T> getContent() {
        return content;
    }

    public void setContent(List<T> content) {
        this.content = content;
    }

    public Integer getOffset() {
        return offset;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public Long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(Long totalElements) {
        this.totalElements = totalElements;
    }

    public Integer getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(Integer totalPages) {
        this.totalPages = totalPages;
    }

    public Boolean getLast() {
        return last;
    }

    public void setLast(Boolean last) {
        this.last = last;
    }
}
