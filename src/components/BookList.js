/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-29 16:33:57
 * @LastEditTime: 2019-11-25 16:08:09
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import { Pagination, Modal, Button, InputNumber,Popover,List } from 'antd';
import axios from 'axios';


class BookList extends Component {
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
      defaultNum:1,
      bookDetail:'',
      bookTitle:'',
      bookname:''
    }
    this.getCount = this.getCount.bind(this)
    this.onpageChange = this.onpageChange.bind(this)
    this.onpageChange2 = this.onpageChange2.bind(this)
    this.onShowSizeChange = this.onShowSizeChange.bind(this)
    
  }
  componentWillMount(){
    this.getCount()
    this.getTableData()
  }
  // 获取table数据
  getCount() {
    axios.post("http://localhost:8080/book/listCount", {}).then(res => {
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
    axios.post("http://localhost:8080/book/booklist", obj).then(res => {
      this.setState({
        tableData: res.data.data
      })
    })
  }
  getbookDetail(v=1) {
    let obj ={
        bookname: this.state.bookname,
        id: v,
    }
    axios.post("http://localhost:8080/book/list", obj).then(res => {
      if(res.data.status=='success'){
        this.setState({
          bookDetail: res.data.data[0].content,
          bookTitle: res.data.data[0].title
        })
      }
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
  onpageChange2(current, pageSize){
    this.setState({
      page: current,
    },()=>{
      this.getbookDetail(current)
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
    debugger
    this.setState({
      visible: true,
      defaultNum:1,
      bookname: val.name
    },()=>{
      this.getbookDetail();
    })
  }
 
  render() { 
    return ( 
      <div className="the_table">
            <h3>爬虫的移动书城</h3>
            <hr/>
            <div>
            <Pagination showSizeChanger onShowSizeChange={this.onShowSizeChange} 
              onChange={this.onpageChange} defaultCurrent={1} total={this.state.allTotal} />
            </div>
            <ul className="the_book_List">
              {this.state.tableData.map((v,i)=>{
                return (<li key={i}>
                  <img src={v.images} alt={v.name} title={v.name} onClick={this.openCart.bind(this,v)} />
                  <p>
                      <a href={v.images} target="_blank" >{v.name}</a>
                      <br/>
                      <span>作者:[{v.author}]</span>
                      <br/>
                      <span>类型:[{v.type}]---评分:[{v.ratings}]</span>
                  </p>
                </li>)
              })}
            </ul>

            <Modal title={this.state.bookname} width={1100}
                          visible={this.state.visible} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                          maskClosable={false} keyboard={false} >
                            <Pagination onChange={this.onpageChange2} defaultCurrent={1} total={100} />
                                <div className="the_book_wrapper">
                                    <h3>{this.state.bookTitle}</h3>      
                                    <p>{this.state.bookDetail}</p>      
                                </div>
                          </Modal>
            
      </div>
     );
  }
}
 
export default BookList;