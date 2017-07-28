/**
 * 
 */
;(function($,window,document,undefined){
	var _setting = {
			elementId:"id",
			onclick:onclick,
			onsearch:onsearch
	};
	$.fn.select={
			init:function(setting){
				$.extend(_setting, setting);
				getHtml();
			},
			select:function(nodes){
				$("#selectDiv_"+_setting.elementId).show();
				connectNodes(nodes);
			}
	}
	
	
	
	function getHtml(){
		var html = [];
		html.push("<div id=selectDiv_",_setting.elementId," style='display:none;width:250px; position:absolute;" +
				"z-index:9; border:1px solid #a5b6c8;background:#eef3f7'>");
		html.push("<div><input type='text' id='selectSearch_",_setting.elementId,"' style='width: 98%;border-radius: 3px;height: 25px;margin-top: 5px;'></div>");
		html.push("<div id='selectListDiv_",_setting.elementId,"' style='overflow: auto; height:260px;background:#ffffff; margin:10px auto; padding-left:15px;'><ul>");
		html.push("</ul></div>");
		html.push("</div>");
		$("#"+_setting.elementId).after(html.join(""));
	}
	
	function connectNodes(_nodes){
		var html = [];
		if(_nodes.length == 0){
			html.push("<div>No data!<div>");
		}else{
			for(var i = 0; i < _nodes.length; i++){
				html.push("<li id='selectList_",_setting.elementId,"_",_nodes[i].id,"'><input type='radio' name='select' value='",_nodes[i].id,"'>" +
						"&nbsp;<span style='cursor:pointer;'>",_nodes[i].name,"</span></li>");
			}
		}
		$("#selectListDiv_"+_setting.elementId+" ul").html(html.join(""));
		dealEvent();
		initSelectVal();
	}
	
	function initSelectVal(){
		var selectVal = $("#"+_setting.elementId+"_code").val();
		$("#selectList_"+_setting.elementId+"_"+selectVal+" :radio").attr("checked", "checked");
	}
	
	function dealEvent(){
		$("html").live("mousedown ", function(e){
			var e = e || window.event; //浏览器兼容性 
			var elem = e.target || e.srcElement; 
			while (elem) { //循环判断至根节点，防止点击的是div子元素 
				if (elem.id && elem.id=="selectDiv_"+_setting.elementId) return; 
				elem = elem.parentNode; 
			} 
			$("#selectDiv_"+_setting.elementId).hide();
		});
		$("li[id*='selectList_"+_setting.elementId+"']").live("click", function(){
			$("#"+_setting.elementId+"_code").val($(this).children("input[type=radio]").val());
			$("#"+_setting.elementId).val($(this).children("span").text());
			$("#selectDiv_"+_setting.elementId).hide();
		});
		$("#selectSearch_"+_setting.elementId).die("input propertychange");
		$("#selectSearch_"+_setting.elementId).live("input propertychange", function(){
			(_setting.onsearch).call(null, $("#selectSearch_"+_setting.elementId).val().trim());
		});
	}
	
})(jQuery,window,document);