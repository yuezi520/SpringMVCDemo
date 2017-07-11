package com.cn.mvc.service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.cn.mvc.bean.Grade;
import com.cn.mvc.dao.IGradeDao;
import com.cn.mvc.util.ImportExcelUtil;
import com.cn.mvc.util.StringUtil;

@Controller
public class GradeService implements IGradeService {
	@Autowired
	IGradeDao gradeDao;
	private static Logger logger = LogManager.getLogger(GradeService.class.getName());

	@Override
	public List<Grade> getAllGrade() throws Exception {
		Grade grade = new Grade();
		grade.setFlag("all");
		gradeDao.getGrade(grade);
		return grade.getList();
	}
	
	@Override
	public Grade getGradeBySno(@PathVariable("sno") String sno) throws Exception{
		Grade grade = new Grade();
		sno = StringUtil.parseChinese(sno);
		grade.setSno(sno);
		gradeDao.getGrade(grade);
		if(null != grade.getList() && grade.getList().size() > 0){
			if(grade.getList().get(0).getSno().equals(grade.getSno()))
				return grade.getList().get(0);
		}
		return null;
	}

	@Override
	public Grade getGradeBySnoQuery(String sno) throws Exception {
		Grade grade = new Grade();
		sno = StringUtil.parseChinese(sno);
		grade.setSno(sno);
		gradeDao.getGrade(grade);
		if(null != grade.getList() && grade.getList().size() > 0){
			if(grade.getList().get(0).getSno().equals(grade.getSno()))
				return grade.getList().get(0);//sno为空时，会返回全部
		}
		return null;
	}

	@Override
	public List<Grade> getGrade(Grade grade) throws Exception{
		gradeDao.getGrade(grade);
		return grade.getList();
	}
	
	@Override
	public List<Grade> getAllStudent() throws Exception{
		Grade grade = new Grade();
		gradeDao.getStudent(grade);
		return grade.getList();
	}
	
	@Override
	public Grade getStudentQuery(Grade grade) throws Exception {
		grade.setSname(StringUtil.parseChinese(grade.getSname()));
		gradeDao.getStudent(grade);
		if(null != grade.getList() && grade.getList().size() > 0){
			if(grade.getList().get(0).getSno().equals(grade.getSno()))
				return grade.getList().get(0);//sno为空时，会返回全部
		}
		return null;
	}

	@Override
	public String saveStudent(Grade grade) throws Exception {
		grade.setSname(StringUtil.parseChinese(grade.getSname()));
		gradeDao.addStudent(grade);
		return grade.getFlag();
	}

	@Override
	public String editStudent(Grade grade) throws Exception {
		Grade newGrade = getStudentQuery(grade);//以sno查询学生信息，获取对象，更新值
		newGrade.setSname(StringUtil.parseChinese(grade.getSname()));
		gradeDao.updateStudent(newGrade);
		return newGrade.getFlag();
	}

	@Override
	public String deleteStudent(Grade grade) throws Exception {
		gradeDao.deleteStudent(grade);
		return grade.getFlag();
	}
	
	@Override
	public List<Grade> getAllCourse() throws Exception{
		Grade grade = new Grade();
		gradeDao.getCourse(grade);
		return grade.getList();
	}
	
	@Override
	public Map<String, Object> upload(HttpServletRequest request) throws Exception {
		logger.debug("开始处理上传成绩excel表");
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		InputStream in =null;  
		List<List<Object>> listob = null;  
		MultipartFile file = multipartRequest.getFile("upGrade");  
		if(file.isEmpty()){  
			throw new Exception("文件不存在！");  
		}  

		in = file.getInputStream();  
		listob = new ImportExcelUtil().getBankListByExcel(in,file.getOriginalFilename()); 
		
		Map<String, Object> result = new HashMap<>();
		List<String> readErrors = new ArrayList<>();
		List<String> saveFails = new ArrayList<>();
		int readFailnum = 0;
		int saveFailnum = 0;
		Map<String, String> studentMap = getStudentMap();
		Map<String, String> courseMap = getCourseMap();
		for(int i = 0; i < listob.size(); i++){
			List<Object> row = listob.get(i);
			Grade grade = new Grade();
			String sno = (String) row.get(0);
			if(studentMap.containsKey(sno)){
				if(((String) row.get(1)).equals(studentMap.get(sno))){
					grade.setSno(sno);
				}else{
					readErrors.add("第"+(i+2)+"行：学号为"+sno+"的学生名字不对");
					readFailnum++;
					continue;
				}
			}else{
				readErrors.add("第"+(i+2)+"行：没有学号为"+sno+"的学生");
				readFailnum++;
				continue;
			}
			String cno = "";
			String cname = (String) row.get(2);
			for(String key : courseMap.keySet()){
				if(null != courseMap.get(key) && courseMap.get(key).equals(cname)){
					cno = key;
				}
			}
			if(cno.equals("")){
				readErrors.add("第"+(i+2)+"行：课程名称【"+cname+"】与记录不一致");
				readFailnum++;
				continue;
			}else{
				grade.setCno(cno);
			}
			String score = (String) row.get(3);
			if(isDouble(score)){
				grade.setScore(Double.parseDouble(score));
			}else{
				readErrors.add("第"+(i+2)+"行：成绩不是数字");
				readFailnum++;
				continue;
			}
			if(getGrade(grade).size() > 0){
				saveFails.add("第"+(i+2)+"行：数据已经存在");
				saveFailnum++;
			}else{
				gradeDao.addGrade(grade);
				if("0".equals(grade.getFlag())){
					saveFails.add("第"+(i+2)+"行：新增失败");
					saveFailnum++;
				}
			}
		}
		
		if(readFailnum > 0 || saveFailnum > 0){
			result.put("readFailnum", readFailnum);
			result.put("readErrors", readErrors);
			result.put("saveFailnum", saveFailnum);
			result.put("saveFails", saveFails);
			return result;
		}
		return result;
	}
	
	public Map<String, String> getStudentMap(){
		Map<String, String> result = new HashMap<String, String>();
		List<Grade> list;
		try {
			list = this.getAllStudent();
			for(Grade stu : list){
				result.put(stu.getSno(), stu.getSname());
			}
		} catch (Exception e) {
			logger.debug("getStudentMap()方法获取学生信息出现异常");
		}
		return result;
	}
	
	public Map<String, String> getCourseMap(){
		Map<String, String> result = new HashMap<String, String>();
		List<Grade> list;
		try {
			list = this.getAllCourse();
			for(Grade course : list){
				result.put(course.getCno(), course.getCname());
			}
		} catch (Exception e) {
			logger.debug("getCourseMap()方法获取课程信息出现异常");
		}
		return result;
	}
	
	public boolean isDouble(String str){
	   try{
	      Double.parseDouble(str);
	      return true;
	   }catch(NumberFormatException ex){}
	   return false;
	}
	
	
}
