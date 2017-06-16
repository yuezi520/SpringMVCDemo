/**
 * 获取系统路径
 */
function getRootPath() {
    //获取当前网址，如： http://localhost:9527/zdss-web/login/login.do
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如：/zdss-web/login/login.do
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:9527
    var localhostPath = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/zdss-web
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return localhostPath+projectName;
}
/**
 * 解析URL
 * 处理中文乱码(加码)
 * http://localhost:8080/SpringMVCDemo/services/gradeService/getGradeBySnoQuery?sno=1&sname=%25E6%2596%25B9%25E6%25B3%2595
 * 如果中文没被加码，则使用encodeURI 2次
 * @returns
 */
function parsehref(){
	var request = window.location.href;
	var str = request.substring(request.indexOf("?")+1);
	var strs = str.split("&");
	var arr = [];
	for(var i=0; i<strs.length; i++){
		arr.push(strs[i].substring(0, strs[i].indexOf("=")+1) + encodeURI(strs[i].substring(strs[i].indexOf("=")+1)));
	}
	return arr.join("&");
}