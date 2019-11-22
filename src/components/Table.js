/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-29 16:33:57
 * @LastEditTime: 2019-11-22 11:08:27
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import QuickSearch from './QuickSearch'
import { Pagination, Modal, Button, InputNumber,Popover,List } from 'antd';
import axios from 'axios';


class MovieList extends Component {
  constructor(props) {
    super(props)
    this.state ={
      tableData: [],
      showInt:'',
      searchtext:'',
      page:1,
      pageSize:10,
      allTotal: 0,
      visible: false,
      visible2: false,
      movieInfo:{itemQty:0},
      movieList:[],
      movieNum:0,
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
  handleOk(){
    this.setState({
        visible: false,
    });
  }
  handleCancel(){
      this.setState({
          visible: false,
      });
  }
  openCart(val){
    this.setState({
      movieInfo: Object.assign(this.state.movieInfo,val),
      visible: true
    })
  }
  numChange(v){
    debugger
    this.setState({
      movieNum: v
    })
  }
  addToCart(v){
    debugger
    let item ={
      name: v.name,
      itemQty: this.state.movieNum
    };
    this.setState({
      movieList: this.state.movieList.concat(item)
    })
  }
  hide(){
    this.setState({
      visible2: false,
  });
  }
  handleVisibleChange(){
    this.setState({
      visible2: false,
  });
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
                return (<li key={i}>
                  <img src={v.image} alt={v.name} title={v.name} onClick={this.openCart.bind(this,v)} />
                  <p>
                      <a href={v.href} target="_blank" >{v.name}---{v.score}</a>
                  </p>
                </li>)
              })}
            </ul>

            <Modal title="信息页面" width={700}
                          visible={this.state.visible} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                          maskClosable={false} keyboard={false} >
                                <div className="the_movie_wrapper">
                                  <div className="the_left">
                                  <img src={this.state.movieInfo.image} />
                                  </div>
                                  <div className="the_right">
                                    <p>
                                      <a href={this.state.movieInfo.href} >{this.state.movieInfo.name}</a>
                                    </p>
                                    <p>评分{this.state.movieInfo.score}</p>
                                    <div>
                                       <InputNumber min={0} max={10} defaultValue={0} onChange={this.numChange.bind(this)} />
                                       <span>  </span>
                                       <Button type="primary" onClick={this.addToCart.bind(this, this.state.movieInfo)} disabled={this.state.movieNum<=0}>加入购物车</Button>
                                    </div>
                                    <br/>
                                    <div>
                                    <Popover title="查看购物车"  placement="bottom"
                                       content={
                                         <List bordered size="small" dataSource={this.state.movieList}
                                         renderItem={(item,index)=>(<List.Item>{item.itemQty} * {item.name}</List.Item>)} /> 
                                       }>
                                        <p><Button type="primary">查看购物车</Button></p>
                                      </Popover>
                                    </div>
                                    
                                  </div>
                                  
                                </div>
                          </Modal>
            
      </div>
     );
  }
}
 
export default MovieList;