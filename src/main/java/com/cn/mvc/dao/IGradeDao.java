package com.cn.mvc.dao;

import java.util.List;

import com.cn.mvc.bean.Grade;

public interface IGradeDao {
	/**
	 * 获取所有学生成绩
	 * @return
	 */
	public List<Grade> getGrade(Grade grade);
}
