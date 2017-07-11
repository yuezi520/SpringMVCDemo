/**
 * 
 */
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
});

