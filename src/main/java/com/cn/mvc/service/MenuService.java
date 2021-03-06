package com.cn.mvc.service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.cn.mvc.bean.Menu;
import com.cn.mvc.dao.IMenuDao;
import com.cn.mvc.service.IMenuService;
import com.cn.mvc.util.ImportExcelUtil;
import com.cn.mvc.util.StringUtil;

@Controller
public class MenuService implements IMenuService {
	@Autowired
	IMenuDao menuDao;
	
	@Override
	public  String  upload(HttpServletRequest request) throws Exception{  
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;    
//        System.out.println("通过传统方式form表单提交方式导入excel文件！");  
          
        InputStream in =null;  
        List<List<Object>> listob = null;  
        MultipartFile file = multipartRequest.getFile("upfile");  
        if(file.isEmpty()){  
            throw new Exception("文件不存在！");  
        }  
        in = file.getInputStream();  
        listob = new ImportExcelUtil().getBankListByExcel(in,file.getOriginalFilename());  
        in.close();  
        
        if(listob.size() > 0){
        	Menu menu = new Menu();
            menu.setApp(listob.get(0).get(5)+"");
            if(getAllMenu(menu).size() > 0){
            	return "该应用已有菜单";
            }
        }
        
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
        
        return "success";  
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

	private static Logger logger = LogManager.getLogger(MenuService.class.getName());
	@Override
	public List<Menu> getAllMenu(Menu menu) throws Exception {
		logger.debug("获取菜单");
		menu.setApp(StringUtil.parseChinese(menu.getApp()));
		menuDao.getMenu(menu);
		return menu.getList();
	}  
	
	@Override
	public Menu getMenu(Menu menu) throws Exception {
		List<Menu> list = getAllMenu(menu);
		for(int i = 0; i < list.size(); i++){
			Menu tmp = list.get(i);
			if(menu.getId() == tmp.getId()){
				return tmp;
			}
		}
		return null;
	}  
	
	@Override
	public String deleteMenu(Menu menu) throws Exception{
		logger.debug("删除菜单");
		menuDao.deleteMenu(menu);
		return menu.getFlag();
	}

	@Override
	public Map<String, Object> fileAjaxUpload(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> result = new HashMap<>();
		  
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;    
        InputStream in =null;  
        List<List<Object>> listob = null;  
        MultipartFile file = multipartRequest.getFile("upfile");  
        if(file.isEmpty()){  
            throw new Exception("文件不存在！");  
        }  
        in = file.getInputStream();  
        listob = new ImportExcelUtil().getBankListByExcel(in,file.getOriginalFilename());  
        in.close();  
        
        if(listob.size() > 0){
        	Menu menu = new Menu();
            menu.setApp(listob.get(0).get(5)+"");
            if(getAllMenu(menu).size() > 0){
            	result.put("error", "该应用已有菜单");
            	return result;
            }
        }
        
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
	                	result.put("error", "保存失败");
	                	return result;
	                }
	                parentId0 = menu.getId();
            	}else{
            		result.put("error", "数据有问题");
                	return result;
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
	                	result.put("error", "保存失败");
	                	return result;
	                }
	                parentId1 = menu.getId();
            	}else if(null != lo.get(2) && !("").equals(lo.get(2))){
            		level2 = lo.get(2)+"";
            		menu.setParentId(parentId1);
	            	menu.setParent(level1);
	            	menu.setNameCn(level2);
	            	menuDao.saveMenu(menu);
	                if("0".equals(menu.getFlag())){
	                	result.put("error", "保存失败");
	                	return result;
	                }
	                parentId2 = menu.getId();
            	}
            }
        }  
        result.put("success", "success");
		return result;
	}
	
	public String updateMenu(Menu menu) throws Exception{
		menuDao.updateMenu(menu);
		return menu.getFlag();
	}
	
}
