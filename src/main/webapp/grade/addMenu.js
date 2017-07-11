/**
 * 
 */
$(function(){
	$.fn.head.init();
	
	var baseurl = getRootPath();
	
	//校验  
	function checkData(){  
	   var fileDir = $("#upfile").val();  
	   var suffix = fileDir.substr(fileDir.lastIndexOf("."));  
	   if("" == fileDir){  
	       alert("请选择需要导入的Excel文件！");  
	       $("#upfile").val(""); 
	       return false;  
	   }  
	   if(".xls" != suffix && ".xlsx" != suffix ){  
	       alert("请选择Excel格式的文件导入！");  
	       $("#upfile").val(""); 
	       return false;  
	   }  
	   return true;  
	}
	
	$("#upfileBtn").bind("click", upload);
	function upload(){
		if(checkData()){
			$.ajaxFileUpload({
			　  url : baseurl+"/services/menuService/fileAjaxUpload",
			   fileElementId:'upfile',
			   dataType : "json",
			   success: function(data){
				   if(data.success == "success"){
					   window.location.reload();
				   }else{
					   alert(data.error);
					   $("#upfile").val("");  
				   }
			   },
			   error: function(data){
				   alert("上传失败");
			   }
		    });
		}
	}
});