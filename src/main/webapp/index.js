/**
 * 
 */
$(function(){
	 $('#btn').click(function(){  
         if(checkData()){  
             $('#form1').ajaxSubmit({    
                 url:'services/uplaodFileService/uploadAjaxForm',  
                 dataType: 'text',  
                 success: resutlMsg,  
                 error: errorMsg  
             });   
             function resutlMsg(msg){  
                 alert(msg);     
                 $("#upfile").val("");  
             }  
             function errorMsg(){   
                 alert("导入excel出错！");      
             }  
         }  
     });
});

//JS校验form表单信息  
function checkData(){  
   var fileDir = $("#upfile").val();  
   var suffix = fileDir.substr(fileDir.lastIndexOf("."));  
   if("" == fileDir){  
       alert("选择需要导入的Excel文件！");  
       return false;  
   }  
   if(".xls" != suffix && ".xlsx" != suffix ){  
       alert("选择Excel格式的文件导入！");  
       return false;  
   }  
   return true;  
}