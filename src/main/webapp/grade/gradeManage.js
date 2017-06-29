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
	
	getData("getAllGrade", [], {}, "getAllGrade(result)");
	function getAllGrade(result){
		var htmltb = "";
		for(var i = 0; i < result.length; i++){
			var res = result[i];
			htmltb += "<tr>";
			htmltb += "<td>"+res.sno+"</td>" + "<td>"+res.sname+"</td>" + 
					  "<td>"+res.cname+"</td>" + "<td>"+res.score+"</td>";
			htmltb += "</tr>";
		}
		$("#gradeTb1 tbody").html(htmltb);
	}
	
	getData("getGradeBySno", ["3"], {}, "getGradeBySno(result)");
	function getGradeBySno(result){
		var htmltb = "";
		if(result){
			var res = result;
			htmltb += "<tr>";
			htmltb += "<td>"+res.sno+"</td>" + "<td>"+res.sname+"</td>" + 
					  "<td>"+res.cname+"</td>" + "<td>"+res.score+"</td>";
			htmltb += "</tr>";
		}
		$("#gradeTb2 tbody").html(htmltb);
	}
	
	getData("getGradeBySnoQuery", [], {sno:"2"}, "getGradeBySnoQuery(result)");
	function getGradeBySnoQuery(result){
		var htmltb = "";
		if(result){
			var res = result;
			htmltb += "<tr>";
			htmltb += "<td>"+res.sno+"</td>" + "<td>"+res.sname+"</td>" + 
					  "<td>"+res.cname+"</td>" + "<td>"+res.score+"</td>";
			htmltb += "</tr>";
		}
		$("#gradeTb3 tbody").html(htmltb);
	}
	
	$("#addstudent").bind("click",function(){
		window.location.href = baseurl + "/grade/add-edit-student.html";
	});
	
	getData("getAllGrade", [], {}, "draw1(result)");
	function draw1(result){
		var xAxisData = [];
		var yAxisData = [];
		var legendData = [];
		for(var i = 0; i < result.length; i++){
			if(!xAxisData.contains(result[i].sname)){
				xAxisData.push(result[i].sname);
			}
			if(!legendData.contains(result[i].cname)){
				legendData.push(result[i].cname);
			}
		}
		for(var i = 0; i < legendData.length; i++){
			var tmp = [];
			for(var j = 0; j < xAxisData.length; j++){
				var isFind = false;
				for(var k = 0; k < result.length; k++){
					if(xAxisData[j] == result[k].sname && legendData[i] == result[k].cname){
						tmp.push(result[k].score);
						isFind = true;
						break;
					}
				}
				if(!isFind){
					tmp.push("-");
				}
			}
			yAxisData.push(tmp);
		}
		var series = [];
		for(var i = 0; i < legendData.length; i++){
			var tmp = {
				name:legendData[i],
				type:"bar",
				data:yAxisData[i]
			};
			series.push(tmp);
		}
		console.log(series);
		var myChart = echarts.init(document.getElementById('chart1'));
		var option = {
			tooltip : {
				show:true
		        /*trigger: 'axis'*/
		    },
			legend:{
				data:legendData
			},
			xAxis : [
		        {
		            type : 'category',
		            data : xAxisData
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series:series
		};
		myChart.setOption(option);
	}
	
});