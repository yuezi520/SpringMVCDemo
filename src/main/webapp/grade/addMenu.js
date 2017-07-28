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
	
	Array.prototype.contains = function(obj){
		for(var i = 0; i < this.length; i++){
			if(obj === this[i])
				return true;
		}
		return false;
	}
	var secondMenu = [];
	$("#parent_code").bind("change", function(){
		
	});
	
	
	function getData(servicePath, params, datas, callback){
		var url = baseurl+"/services/menuService/"+servicePath;
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
	var setting1 = {
			elementId:"parent",
			onclick:onclick1,
			onsearch:onsearch1	
	};
	$("#parent").click(function(){
		$.fn.select.init(setting1);
		getData("getAllMenu", ["GradeSystem"],{},"getMenu(result)");
	});
	function getMenu(result){
		var prentIds = [];
		var nodes = [];
		if(result && result.length > 0){
			for(var i = 0; i < result.length; i++){
				if(!prentIds.contains(result[i].parentId)){
					prentIds.push(result[i].parentId);
				}
			}
			for(var i = 0; i < result.length; i++){
				if(prentIds.contains(result[i].id)){
					var row = {};
					row.id = result[i].id;
					row.name = result[i].nameCn;
					nodes.push(row);
				}
			}
		}
		$.fn.select.select(nodes);
	}
	function onclick1(){
		
	}
	function onsearch1(searchval){
		getData("getAllMenu", ["GradeSystem"],{nameCn:encodeURI(searchval)},"getMenu(result)");
	}
});