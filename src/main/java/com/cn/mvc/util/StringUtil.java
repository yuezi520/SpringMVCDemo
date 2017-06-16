package com.cn.mvc.util;

import java.net.URLDecoder;

public class StringUtil {
	public static String parseChinese(String s) throws Exception{
		return (null == s) ? s : URLDecoder.decode(s,"utf-8");
	}
}
