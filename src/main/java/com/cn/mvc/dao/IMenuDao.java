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
	
	/**
	 * 删除菜单
	 * @param menu
	 * @return
	 */
	public String deleteMenu(Menu menu);
	
	/**
	 * 更新菜单
	 * @param menu
	 * @return
	 */
	public String updateMenu(Menu menu);
}
