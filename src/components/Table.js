/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-29 16:33:57
 * @LastEditTime: 2019-11-20 14:38:09
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import QuickSearch from './QuickSearch'
import { Pagination  } from 'antd';
import axios from 'axios';


class List extends Component {
  constructor(props) {
    super(props)
    this.state ={
      tableData: [],
      showInt:'',
      searchtext:'',
      page:1,
      pageSize:10,
      allTotal:''
    }
    this.getQuickVal = this.getQuickVal.bind(this)
    this.getCount = this.getCount.bind(this)
    this.onpageChange = this.onpageChange.bind(this)
    this.onShowSizeChange = this.onShowSizeChange.bind(this)
    
  }
  componentWillMount(){
    this.getCount()
    this.getTableData()
  }
  // 获取table数据
  getCount() {
    axios.post("http://localhost:8080/movies/listCount", {}).then(res => {
      this.setState({
        allTotal: res.data.data
      })
    })
  }
  getTableData() {
    let obj ={
        name: this.state.searchtext,
        page: this.state.page,
        pageSize: this.state.pageSize,
    }
    axios.post("http://localhost:8080/movies/list", obj).then(res => {
      this.setState({
        tableData: res.data.data
      })
        
    })
  }
  getQuickVal(val){
    this.setState({
      tableData: [...this.state.tableData, val]
    })
  }
  onpageChange(current, pageSize){
    this.setState({
      page: current,
      pageSize: pageSize,
    },()=>{
      this.getTableData()
    })
  }
  onShowSizeChange(current, pageSize) {
    this.setState({
        page: current,
        pageSize: pageSize,
    },()=>{
      this.getTableData()
    })
  }
 
  render() { 
    return ( 
      <div className="the_table">
        <QuickSearch name={this.state.showInt} getClickedVal={this.getQuickVal} />
            <hr/>
            <div>
            <Pagination showSizeChanger onShowSizeChange={this.onShowSizeChange} 
              onChange={this.onpageChange} defaultCurrent={1} total={this.state.allTotal} />
            </div>
            <ul className="the_movie_List">
              {this.state.tableData.map((v,i)=>{
                return <li key={i}>
                  <img src={v.image} alt={v.name} title={v.name}/>
                  <p>
                      <a href={v.href} target="_blank" >{v.name}---{v.score}</a>
                  </p>
                </li>
              })}
            </ul>
            
      </div>
     );
  }
}
 
export default List;