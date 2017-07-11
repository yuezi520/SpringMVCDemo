$(function(){
	$.fn.head.init();
	
	var baseurl = getRootPath();
	//少个查询参数，用get方法，params和datas尽量用其一，处理中文较繁琐
	//处理中文 通过'/'方式拼接url的，要手动encodeURI两次
	//通过'?&'方式拼接url（即使用data）的，手动encodeURI一次，浏览器encodeURI一次
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
	//多个查询参数，用post方法
	//处理中文   post方法，encodeURI不是必要的
	//params和data可以不用encodeURI，通过设置type和content-type,使编码保持一致就不会乱码
	//type:"post",
	//Content-Type:application/x-www-form-urlencoded;charset=utf-8，默认值就是这个
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
	
	if(window.location.href.indexOf("?") != -1){
		getData1("getStudentQuery",[], parsehref(), "initstudent(result)");
	}
	function initstudent(result){
		if(result){
			$("#editDiv").show();
			$("#addDiv").hide();
			$("#e_sno").val(result.sno);
			$("#e_sname").val(result.sname);
		}
	}
	
	$("#addStudentSubmitBtn1").bind("click",function(){
//		$("#addStudentForm").attr("action", baseurl+"/services/gradeService/saveStudent");
//		alert($("#addStudentForm").attr("action"));
//		1)序列化表单元素，返回json数据
//        var params = $("#addStudentForm").serializeArray();
//      2)自己拼接json
        var sno = $("#sno").val();
        var sname = $("#sname").val();
        var params = {sno:sno, sname:sname};
		$.ajax({
			url:baseurl+"/services/gradeService/saveStudent",
			dataType:"json",
			data:params,
			success:function(result){
				alert("success")
			}
		});
	});
	
	$("#addStudentSubmitBtn").bind("click",function(){
        //自己拼接json
        var sno = $("#sno").val();
        if(sno == ""){
        	alert("学号必填");
        	$("#sno").focus();
        	return;
        }
        var sname = $("#sname").val();
        var datas = {sno:sno, sname:sname};
        getData2("saveStudent",[],datas,"saveStudent(result)");
	});
	function saveStudent(result){
		if(result){
			alert("操作成功")
			window.location.reload();
		}else{
			alert("学号已经存在")
		}
	}
		
	$("#editStudentSubmitBtn").bind("click",function(){
		var sno = $("#e_sno").val();
        var sname = $("#e_sname").val();
        var datas = {sno:sno, sname:sname};
        getData2("editStudent",[],datas,"editStudent(result)");
	});
	function editStudent(result){
		if(result){
			alert("操作成功")
			window.location.reload();
		}else{
			alert("未知异常")
		}
	}
});