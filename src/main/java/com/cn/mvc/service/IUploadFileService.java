package com.cn.mvc.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@RequestMapping("/uplaodFileService")
public interface IUploadFileService {
	/**  
     * 描述：通过传统方式form表单提交方式导入excel文件  
     * @param request  
     * @throws Exception  
     */  
	@ResponseBody  
    @RequestMapping("upload")  
    public  String  upload(HttpServletRequest request) throws Exception;
    
    /** 
     * 描述：通过 jquery.form.js 插件提供的ajax方式上传文件 
     * @param request 
     * @param response 
     * @throws Exception 
     */  
    @ResponseBody  
    @RequestMapping("uploadAjaxForm")  
    public  String  uploadAjaxForm(HttpServletRequest request,HttpServletResponse response) throws Exception; 
	
}
