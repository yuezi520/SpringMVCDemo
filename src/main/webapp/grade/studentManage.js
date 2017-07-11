$(function(){
	$.fn.head.init();
	
	var baseurl = getRootPath();
	function getData1(servicePath, params, datas, callback){
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
	
	function getData2(servicePath, params, datas, callback){
		var url = baseurl+"/services/gradeService/"+servicePath;
		if(params && params.length>0){
			for(var i = 0; i < params.length; i++){
				url += "/" + params[i];
			}
		}
		$.ajax({
			url:url,
			type:"post",
			dataType:"json",
			data:datas,
			success:function(result){
				eval(callback);
			}
		});
	}
	
	getData1("getAllStudent", [], {}, "getAllStudent(result)");
	function getAllStudent(result){
		var htmltb = "";
		for(var i = 0; i < result.length; i++){
			var res = result[i];
			htmltb += "<tr>";
			htmltb += "<td>"+res.sno+"</td>" + "<td>"+res.sname+"</td>" + 
					  "<td><a href='javascript:void(0)' _name='showStu' sno='"+res.sno+"' >编辑</a>\t&nbsp;&nbsp;"+
					  "<a href='javascript:void(0)' _name='delStu' sno='"+res.sno+"'>删除</a></td>";
			htmltb += "</tr>";
		}
		$("#stuTb tbody").html(htmltb);
	}
	/**编辑*/
	$("a[_name=showStu]").live("click", function(){
		getData1("getStudentQuery",[], {sno:$(this).attr("sno")}, "showStuResult(result)");
	});
	function showStuResult(result){
		$("#editbg, #editdiv").show();
		$("#e_sno").val(result.sno);
		$("#e_sname").val(result.sname);
	}
	$("#close").bind("click", function(){
		$("#editbg, #editdiv").hide();
	});
	$("#editStudentSubmitBtn").bind("click",function(){
		var sno = $("#e_sno").val();
        var sname = $("#e_sname").val();
        var datas = {sno:sno, sname:sname};
        getData2("editStudent",[],datas,"editStudent(result)");
	});
	function editStudent(result){
		if(result){
//			$("#editbg, #editdiv").hide();
			window.location.reload();
		}else{
			alert("未知异常");
		}
	}
	
	/**<a>删除</a>动态生成，事件处理要注意，要么在生成的地方bind事件，要么用live委派事件，应该还可以用on等方法*/
	$("a[_name=delStu]").live("click", function(){
		if(confirm("确定删除该记录？")){
			getData1("deleteStudent", [$(this).attr("sno")], {}, "deleteStuResult(result)");
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
});