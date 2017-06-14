package com.cn.mvc.service;

import java.util.List;

import javax.ws.rs.QueryParam;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cn.mvc.bean.Grade;

@RequestMapping("/gradeService")
public interface IGradeService {
	@RequestMapping("/getAllGrade")
	@ResponseBody
	public List<Grade> getAllGrade();
	
	@RequestMapping("/getGradeBySno/{sno}")
	@ResponseBody
	public Grade getGradeBySno(@PathVariable("sno") String sno);
	
	@RequestMapping("/getGradeBySnoQuery")
	@ResponseBody
	public Grade getGradeBySnoQuery(@RequestParam("sno") String sno);
	
}
