package com.cn.mvc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.cn.mvc.bean.Grade;
import com.cn.mvc.dao.IGradeDao;

@Controller
public class GradeService implements IGradeService {
	@Autowired
	IGradeDao gradeDao;

	@Override
	public List<Grade> getAllGrade() {
		Grade grade = new Grade();
		gradeDao.getGrade(grade);
		return grade.getList();
	}

	@Override
	public Grade getGradeBySno(String sno) {
		Grade grade = new Grade();
		grade.setSno(sno);
		gradeDao.getGrade(grade);
		if(null != grade.getList())
			return grade.getList().get(0);
		return null;
	}

	@Override
	public Grade getGradeBySnoQuery(String sno) {
		Grade grade = new Grade();
		grade.setSno(sno);
		gradeDao.getGrade(grade);
		if(null != grade.getList())
			return grade.getList().get(0);
		return null;
	}

}
