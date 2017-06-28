package com.cn.mvc.dao;

import com.cn.mvc.bean.Menu;

public interface IMenuDao {
	/**
	 * 保存菜单
	 * @param list
	 * @return
	 */
	public String saveMenu(Menu menu);
	
	/**
	 * 获取菜单
	 * @param list
	 * @return
	 */
	public String getMenu(Menu menu);
}
