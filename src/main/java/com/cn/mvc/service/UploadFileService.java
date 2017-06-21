package com.cn.mvc.service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.cn.mvc.bean.Menu;
import com.cn.mvc.dao.IMenuDao;
import com.cn.mvc.service.IUploadFileService;
import com.cn.mvc.util.ImportExcelUtil;

@Controller
public class UploadFileService implements IUploadFileService {
	@Autowired
	IMenuDao menuDao;
	
	@Override
	public  String  upload(HttpServletRequest request) throws Exception{  
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;    
        System.out.println("通过传统方式form表单提交方式导入excel文件！");  
          
        InputStream in =null;  
        List<List<Object>> listob = null;  
        MultipartFile file = multipartRequest.getFile("upfile");  
        if(file.isEmpty()){  
            throw new Exception("文件不存在！");  
        }  
        in = file.getInputStream();  
        listob = new ImportExcelUtil().getBankListByExcel(in,file.getOriginalFilename());  
        in.close();  
        
        String level0 = "";
        String level1 = "";
        String level2 = "";
        Integer parentId0 = null;
        Integer parentId1 = null;
        Integer parentId2 = null;
        for (int i = 0; i < listob.size(); i++) {  
            List<Object> lo = listob.get(i);  
            Menu menu = new Menu();
            menu.setVisitPath(lo.get(4)+"");
            menu.setApp(lo.get(5)+"");
            if(i == 0){
            	if(null != lo.get(0) && !("").equals(lo.get(0))){
            		level0 = lo.get(0)+"";
            		menu.setParentId(null);
	            	menu.setParent("");
	            	menu.setNameCn(lo.get(0)+"");
	            	menuDao.saveMenu(menu);
	                if("0".equals(menu.getFlag())){
	                	return "失败";
	                }
	                parentId0 = menu.getId();
            	}else{
            		return "数据有问题";
            	}
            }else{
            	if(i == listob.size()-1){
            		menu.setFlag("2");
            	}
            	if(null != lo.get(1) && !("").equals(lo.get(1))){
	            	level1 = lo.get(1)+"";
	            	menu.setParentId(parentId0);
	            	menu.setParent(level0);
	            	menu.setNameCn(level1);
	            	menuDao.saveMenu(menu);
	                if("0".equals(menu.getFlag())){
	                	return "失败";
	                }
	                parentId1 = menu.getId();
            	}else if(null != lo.get(2) && !("").equals(lo.get(2))){
            		level2 = lo.get(2)+"";
            		menu.setParentId(parentId1);
	            	menu.setParent(level1);
	            	menu.setNameCn(level2);
	            	menuDao.saveMenu(menu);
	                if("0".equals(menu.getFlag())){
	                	return "失败";
	                }
	                parentId2 = menu.getId();
            	}else{
            		
            	}
            }
            
            System.out.println("打印信息-->:父亲:"+menu.getParent()+"  名称："+menu.getNameCn()+"   路径 ："+menu.getVisitPath()+"   应用："+menu.getApp());  
        }  
        
        return "";  
    }  
      
	@Override
	public  String  uploadAjaxForm(HttpServletRequest request,HttpServletResponse response) throws Exception {  
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;    
          
        System.out.println("通过 jquery.form.js 提供的ajax方式上传文件！");  
          
        InputStream in =null;  
        List<List<Object>> listob = null;  
        MultipartFile file = multipartRequest.getFile("upfile");  
        if(file.isEmpty()){  
            throw new Exception("文件不存在！");  
        }  
          
        in = file.getInputStream();  
        listob = new ImportExcelUtil().getBankListByExcel(in,file.getOriginalFilename());  
          
        
        String level0 = "";
        String level1 = "";
        String level2 = "";
//        String level3 = "";
        for (int i = 0; i < listob.size(); i++) {  
            List<Object> lo = listob.get(i);  
            Menu menu = new Menu();
            if(i == 0){
            	if(null != lo.get(0) && !("").equals(lo.get(0))){
	            	level0 = lo.get(0)+"";
	            	menu.setParent("");
	            	menu.setNameCn(level0);
            	}else{
            		return "数据有问题";
            	}
            }else{
            	if(null != lo.get(1) && !("").equals(lo.get(1))){
	            	level1 = lo.get(1)+"";
	            	menu.setParent(level0);
	            	menu.setNameCn(level1);
            	}else if(null != lo.get(2) && !("").equals(lo.get(2))){
            		level2 = lo.get(2)+"";
	            	menu.setParent(level1);
	            	menu.setNameCn(level2);
            	}else{
            		
            	}
            }
            
            menu.setVisitPath(lo.get(4)+"");
            menu.setApp(lo.get(5)+"");
              
            System.out.println("打印信息-->:父亲:"+menu.getParent()+"  名称："+menu.getNameCn()+"   路径 ："+menu.getVisitPath()+"   应用："+menu.getApp());  
        }  
          
        return "success";
    }  
}
