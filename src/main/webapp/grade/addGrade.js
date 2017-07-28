/**
 * 
 */

function isNotANumber(inputData) {
	var re = /^[-|+]?(([1-9]+\.?\d+)|(0\.\d*[1-9]\d*)|([0-9]))$/; //判断字符串是否为数字
	return !(re.test(inputData));
}
$(function(){
	$.fn.head.init();
	
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
	
	$("#upGradeBtn").bind("click", upload);
	function upload(){
		$.ajaxFileUpload({
		　  url : baseurl+"/services/gradeService/upload",
		   fileElementId:'upGrade',
		   dataType : "json",
		   success: function(data){
			  dealUploadResult(data);
		   },
		   error: function(data){
			   alert("上传失败");
		   }
	    });
	}

	function dealUploadResult(data){
		if((data.readFailnum) == undefined){
			alert("SUCCESS");
			window.location.href = baseurl + "/grade/gradeManage.html";
		}
		$("#upReDiv").show();
		$("#readFailDiv").hide();
		$("#saveFailDiv").hide();
		if(data.readFailnum && data.readFailnum > 0){
			$("#upGrade").val("");
			$("#readFailDiv").show();
			$("#readFailnum").text(data.readFailnum);
			if(data.readErrors){
				var tmpHtml = "";
				for(var i = 0; i < data.readErrors.length; i++){
					tmpHtml += data.readErrors[i] +"<br/>";
				}
				$("#readFailDetailDiv").html(tmpHtml);
			}
		}
		if(data.saveFailnum && data.saveFailnum > 0){
			$("#upGrade").val("");
			$("#saveFailDiv").show();
			$("#saveFailnum").text(data.saveFailnum);
			if(data.saveFails){
				var tmpHtml = "";
				for(var i = 0; i < data.saveFails.length; i++){
					tmpHtml += data.saveFails[i] +"<br/>";
				}
				$("#saveFailDetailDiv").html(tmpHtml);
			}
		}
	}
	
	var setting1 = {
			elementId:"sname",
			onclick:onclick1,
			onsearch:onsearch1	
	};
	$("#sname").click(function(){
		$.fn.select.init(setting1);
		getData("getAllStudent",[],{},"getStudent(result)");
	});
	function getStudent(result){
		var nodes = [];
		if(result && result.length > 0){
			for(var i = 0; i < result.length; i++){
				var row = {};
				row.id = result[i].sno;
				row.name = result[i].sname;
				nodes.push(row);
			}
		}
		$.fn.select.select(nodes);
	}
	function onclick1(){
		
	}
	function onsearch1(searchval){
		getData("getStudent",[],{sname:encodeURI(searchval)},"getStudent(result)");
	}
	
	var setting2 = {
			elementId:"cname",
			onclick:onclick2,
			onsearch:onsearch2	
	};
	$("#cname").click(function(){
		$.fn.select.init(setting2);
		getData("getAllCourse",[],{},"getCourse(result)");
	});
	function getCourse(result){
		var nodes = [];
		if(result && result.length > 0){
			for(var i = 0; i < result.length; i++){
				var row = {};
				row.id = result[i].cno;
				row.name = result[i].cname;
				nodes.push(row);
			}
			$.fn.select.select(nodes);
		}
	}
	function onclick2(){
		
	}
	function onsearch2(searchval){
		getData("getCourse",[],{cname:encodeURI(searchval)},"getCourse(result)");
	}
	
	$("#score").bind("change", function(){
		if(isNotANumber($("#score").val())){
			$("#score").val("");
			$("#score").focus();
		}
	});
	
	$("#intoDbBtn").click(function(){
		var datas = {};
		datas.sno = $("#sname_code").val();
		datas.cno = $("#cname_code").val();
		datas.score = $("#score").val();
		getData("addGrade",[], datas,"addGrade(result)");
	});
	function addGrade(result){
		if(result == '1'){
			window.location.reload();
		}else if(result == '2'){
			alert("该记录已经存在");
			window.location.reload();
		}else{
			alert("未知异常");
		}
	}
});


