package com.cn.mvc.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cn.mvc.bean.Grade;
/*
 * get方法中文乱码，js加码，Java解码
 * post方法中文乱码，ajax配置可处理
 * @PathVariable 尝试得到结论，放到实现类能取到值，放在接口上一直无值，被注入null
 * @author Administrator
 *
 */
@RequestMapping("/gradeService")
public interface IGradeService {
	/**
	 * 获取所有成绩数据
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/getAllGrade")
	public List<Grade> getAllGrade() throws Exception;
	
	/**
	 * 使用注解@PathVariable
	 * 通过sno查找成绩数据
	 * @param sno
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/getGradeBySno/{sno}")
	public Grade getGradeBySno(@PathVariable("sno") String sno) throws Exception;
	
	/**
	 * 使用注解@RequestParam
	 * 通过sno查找成绩数据
	 * @param sno
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/getGradeBySnoQuery")
	public Grade getGradeBySnoQuery(@RequestParam("sno") String sno) throws Exception;
	
	/**
	 * 获取成绩
	 * @param grade
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/getGrade")
	public List<Grade> getGrade(Grade grade) throws Exception;
	
	/**
	 * 获取所有学生
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/getAllStudent")
	public List<Grade> getAllStudent() throws Exception;
	
	/**
	 * 目前用于模糊查询姓名
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/getStudent")
	public List<Grade> getStudent(Grade grade) throws Exception;
	
	/**
	 * 组件name与实体类属性名一致，可以映射到值
	 * 通过查询条件获取学生信息
	 * 目前学生信息简单，用grade类就可以
	 * 前台用post方法调用，便于处理中文乱码
	 * @param grade
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/getStudentQuery")
	public Grade getStudentQuery(Grade grade) throws Exception;
	
	/**
	 * 新增学生信息
	 * 可以在path上拼参数，与实体类属性值一致
	 * 例/saveStudent/{sno}
	 * @param grade
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/saveStudent")
	public String saveStudent(Grade grade) throws Exception;
	
	/**
	 * 更新学生信息
	 * @param grade
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/editStudent")
	public String editStudent(Grade grade) throws Exception;
	
	/**
	 * 更新学生信息
	 * @param grade
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/deleteStudent/{sno}")
	public String deleteStudent(Grade grade) throws Exception;
	
	/**
	 * 获取所有课程
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/getAllCourse")
	public List<Grade> getAllCourse() throws Exception;
	
	/**
	 * 获取课程
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/getCourse")
	public List<Grade> getCourse(Grade grade) throws Exception;
	
	/**
	 * 处理成绩excel表
	 * @param request
	 */
	@ResponseBody
	@RequestMapping("/upload")
    public Map<String, Object> upload(HttpServletRequest request) throws Exception ;
	
	/**
	 * 录入成绩
	 * @param grade
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/addGrade")
	public String addGrade(Grade grade) throws Exception;
}
