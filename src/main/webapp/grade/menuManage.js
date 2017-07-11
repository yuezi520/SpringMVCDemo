/**
 * 
 */
$(function(){
$.fn.head.init();
	
	var baseurl = getRootPath();
	function getData1(servicePath, params, datas, callback){
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
	
	function getData2(servicePath, params, datas, callback){
		var url = baseurl+"/services/menuService/"+servicePath;
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
	
	getData1("getAllMenu", ["GradeSystem"], {}, "getAllMenu(result)");
	function getAllMenu(result){
		var htmltb = "";
		for(var i = 0; i < result.length; i++){
			var res = result[i];
			htmltb += "<tr>";
			htmltb += "<td>"+dealNull(res.parent)+"</td>" + "<td>"+dealNull(res.nameCn)+"</td>" + "<td>"+dealNull(res.visitPath)+"</td>" +
					  "<td><a href='javascript:void(0)' _name='showMenu' _id='"+res.id+"' >编辑</a>\t&nbsp;&nbsp;"+
					  "<a href='javascript:void(0)' _name='delMenu' _id='"+res.id+"'>删除</a></td>";
			htmltb += "</tr>";
		}
		
		var tree = jsonConvertTree(result, null);
		if(tree.length > 0){
			htmltb = tr(tree[0]);
		}
		
		$("#menuTb tbody").html(htmltb);
	}
	function dealNull(val){
		return (val==null) ? "" : val;
	}
	
	function tr(tree){
		var htmltb = "";
		if(tree.children.length == 0){
			htmltb += "<tr>";
			htmltb += "<td>"+dealNull(tree.parent)+"</td>" + "<td>"+dealNull(tree.nameCn)+"</td>" + "<td>"+dealNull(tree.visitPath)+"</td>" +
					  "<td><a href='javascript:void(0)' _name='delMenu' _id='"+tree.id+"'>删除</a>\t&nbsp;&nbsp;"+
					  "<a href='javascript:void(0)' _name='showMenu' _id='"+tree.id+"' >编辑</a></td>";
			htmltb += "</tr>";
			return htmltb;
		}else{
			htmltb += "<tr>";
			htmltb += "<td>"+dealNull(tree.parent)+"</td>" + "<td>"+dealNull(tree.nameCn)+"</td>" + "<td>"+dealNull(tree.visitPath)+"</td>" +
					  "<td><a href='javascript:void(0)' _name='delMenu' _id='"+tree.id+"'>删除</a></td>";
			htmltb += "</tr>";
		}
		for(var i = 0; i < tree.children.length; i++){
			htmltb += tr(tree.children[i]);
		}
		return htmltb;
	}
	
	
	$("a[_name=showMenu]").live("click", function(){
		getData1("getMenu", [], {id:$(this).attr("_id"), app:"GradeSystem"}, "showMenuResult(result)");
	});
	function showMenuResult(result){
		$("#editbg, #editdiv").show();
		$("#e_id").val(result.id);
		$("#e_name").text(result.nameCn);
		$("#e_path").val(result.visitPath);
	}
	$("#close").bind("click", function(){
		$("#editbg, #editdiv").hide();
	});
	$("#editMenuSubmitBtn").bind("click", function(){
		var id = $("#e_id").val();
		var path = $("#e_path").val();
		var datas = {id:id, visitPath:path};
		getData1("updateMenu", [], datas, "updateMenu(result)");
	});
	function updateMenu(result){
		if(result){
			window.location.reload();
		}else{
			alert("未知异常");
		}
	}
	
	$("a[_name=delMenu]").live("click", function(){
		getData1("deleteMenu", [], {id:$(this).attr("_id")}, "deleteMenuResult(result)");
	});
	function deleteMenuResult(result){
		if(result){
			alert("操作成功")
			window.location.reload();
		}else{
			alert("未知异常")
		}
	}
});