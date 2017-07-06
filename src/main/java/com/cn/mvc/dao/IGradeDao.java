package com.cn.mvc.dao;

import java.util.List;

import com.cn.mvc.bean.Grade;

/**
 * 当使用存储过程，出参为对象的属性时，接口声明的返回值类型无差别
 * @author Administrator
 *
 */
public interface IGradeDao {
	/**
	 * 获取所有学生成绩
	 * @return
	 */
	public List<Grade> getGrade(Grade grade);
	
	/**
	 * 获取所有学生
	 * @return
	 */
	public List<Grade> getStudent(Grade grade);
	
	/**
	 * 新增学生
	 * @param grade
	 * @return
	 */
	public String addStudent(Grade grade);
	
	/**
	 * 更新学生
	 * @param grade
	 * @return
	 */
	public String updateStudent(Grade grade);
	
	/**
	 * 删除学生
	 * @param grade
	 * @return
	 */
	public String deleteStudent(Grade grade);
	
	/**
	 * 获取所有课程
	 * @return
	 */
	public List<Grade> getCourse(Grade grade);
	
	/**
	 * 新增成绩
	 * @param grade
	 * @return
	 */
	public String addGrade(Grade grade);
}
