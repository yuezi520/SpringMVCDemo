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
					  "<a href='' onclick='deleteStu("+res.sno+")'>删除</a></td>";
			htmltb += "</tr>";
		}
		$("#stuTb tbody").html(htmltb);
	}
	function deleteStu(sno){
		if(confirm("确定删除该记录？")){
			getData("deleteStudent", [sno], {}, "deleteStuResult(result)");
		}else{
			return false;
		}
	}
	function deleteStuResult(result){
		
	}
});