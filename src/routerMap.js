/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-21 19:52:42
 * @LastEditTime: 2019-11-20 14:40:34
 * @LastEditors: Please set LastEditors
 */
// 引入组件----------NotFound---
// import Login from './components/Login';
// import User from './components/User';
import Home from './components/Home';
import Table from './components/Table';
import TodoList from './components/TodoList';
import ItemList from './components/ItemList'
import XiaoquList from './components/XiaoquList'

export default [
  {path: "/home",component: Home,name:'主页', auth:true},
  {path: "/table",component: Table,name:'电影一览页面', auth:true},
  {path: "/itemList",component: ItemList,name:'商品一览页面', auth:true},
  {path: "/xiaoquList",component: XiaoquList,name:'小区一览页面', auth:true},
  // {path: "/user/:username",component: User,name:'用户一览页',auth:true},
  {path: "/todoList/", component: TodoList,name:'TodoList',auth:true,
  },
];
