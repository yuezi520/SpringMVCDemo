package com.cn.mvc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

import com.cn.mvc.bean.Grade;
import com.cn.mvc.dao.IGradeDao;
import com.cn.mvc.util.StringUtil;

@Controller
public class GradeService implements IGradeService {
	@Autowired
	IGradeDao gradeDao;

	@Override
	public List<Grade> getAllGrade() throws Exception {
		Grade grade = new Grade();
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
}
