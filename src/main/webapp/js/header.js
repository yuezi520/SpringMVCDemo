/**
 * 头部导航菜单
 */
;(function($,window,document,undefined){
	/*//定义Header的构造函数
    var Header = function(element, opt){
    	this.$element = element;
    	this.defaults={
    			
    	};
    	this.options = $.extend({}, this.defaults, opt);
    }
    //定义Header的方法
    Header.prototype = {
    	init:function(){
    		
    	},
    	ff:function(){
    		
    	}
    };
    //外部使用方法
    $.fn.head = function(options){
    	var header = new Header(this, options);
    	return header.init();
    };*/
    /**上面的是自定义插件写法*/
	var baseurl = getRootPath();
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
    
    $.fn.head = {
        	init:function(){
        		getData("getAllMenu", ["GradeSystem"], {}, "initmenu(result)");
        	}
        };
    
    function initmenu(result){
    	var menuhtml = getHtml(result);
    	$("nav").html(menuhtml);
    	$(".navItem").on("mouseenter", function(){
			$(".navContent").hide();
			var id = $(this).attr("id");
			id = id.replace("li_one_","one_children_");
			$("#"+id).slideDown();
    	});
    	$(".navItem").on("mouseleave", function(){
    		$(".navContent").hide();
    	});
    	setReportpath();
    }
    
    function getHtml(result){
    	var html = [];
    	var path = location.href.replace(baseurl+"/","");
    	var tree = jsonConvertTree(result, null);
    	/*<ul>
			<!-- 一级菜单，二级菜单(默认不显示) -->
			<li id="li_one_"><span></span></li>
			<div id="one_children_" style="display:none;">
				<ul>
					<li id="li_two_"><a></a></li>
				</ul>
			</div>
		 </ul>*/
    	if(tree.length > 0){
    		var treeObj = tree[0];
    		var temp;
        	if(treeObj.children.length > 0){
        		html.push("<ul >");
        		var one_chileren = treeObj.children;
        		for(var i = 0; i < one_chileren.length; i++){
        			temp = one_chileren[i];
        			html.push("<li id='li_one_"+temp.id+"' class='navItem'><span>"+ temp.nameCn+"</span>");
        			if(temp.children.length > 0){
        				var two_children = temp.children;
        				html.push("<div id='one_children_"+temp.id+"' class='navContent'><ul>");
            			for(var j = 0; j < two_children.length; j++){
            				temp = two_children[j];
            				var selectClassname = "";
            				if(path == temp.visitPath) selectClassname = "navSelect";
            				html.push("<li id='li_two_"+temp.id+"' class=''><a href='"
            						+(baseurl+"/"+temp.visitPath)+"' class='"+selectClassname+"'>"
            						+ temp.nameCn+"</a></li>");
            			}
            			html.push("</ul></div>");
        			}
        			html.push("</li>");
        		}
        		html.push("<div class='clear'></div>");
        		html.push("</ul>");
        	}
    	}
    	return html.join("");
    }
    
    function setReportpath(){
    	var reportpath = $($(".navSelect").parents("li")[1]).find("span").text()+"&nbsp;&nbsp;->&nbsp;&nbsp;"+$(".navSelect").text();
    	$("#reportpath span").html(reportpath);
    }
    
    function jsonConvertTree(result, pid){
    	var tree = [], temp;
    	for(var i = 0; i < result.length; i++){
    		if(pid == result[i].parentId){
    			var treeNode = result[i];
    			temp = jsonConvertTree(result, result[i].id);
    			treeNode.children = temp;
                tree.push(treeNode);
    		}
    	}
    	return tree;
    }
  
    
})(jQuery,window,document);