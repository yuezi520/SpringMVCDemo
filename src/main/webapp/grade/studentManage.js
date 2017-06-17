$(function(){
	var baseurl = getRootPath();
	function getData(servicePath, params, datas, callback){
		var url = baseurl+"/services/gradeService/"+servicePath;
		if(params && params.length>0){
			for(var i = 0; i < params.length; i++){
				url += "/" + encodeURI(encodeURI(params[i]));
			}
		}
		$.ajax({
			url:url,
			dataType:"json",
			data:datas,
			success:function(result){
				eval(callback);
			}
		});
	}
	
	getData("getAllStudent", [], {}, "getAllStudent(result)");
	function getAllStudent(result){
		var htmltb = "";
		for(var i = 0; i < result.length; i++){
			var res = result[i];
			htmltb += "<tr>";
			htmltb += "<td>"+res.sno+"</td>" + "<td>"+res.sname+"</td>" + 
					  "<td><a href='"+baseurl+"/grade/add-edit-student.html?sno="+res.sno+"' >编辑</a>\t&nbsp;&nbsp;"+
					  "<a href='' id='delStu'"+ res.sno+"' sno='"+res.sno+"'>删除</a></td>";
			htmltb += "</tr>";
		}
		$("#stuTb tbody").html(htmltb);
	}
	/**<a>删除</a>动态生成，所以不能先定义方法，目前只知道通过事件委派可以实现*/
	$("a[id*=delStu]").live("click", function(){
		if(confirm("确定删除该记录？")){
			getData("deleteStudent", [$(this).attr("sno")], {}, "deleteStuResult(result)");
		}else{
			return false;
		}
	});
	function deleteStuResult(result){
		if(result){
			alert("操作成功")
			window.location.reload();
		}else{
			alert("未知异常")
		}
	}
	
	$("#addstudent").bind("click",function(){
		window.location.href = baseurl + "/grade/add-edit-student.html";
	});
});