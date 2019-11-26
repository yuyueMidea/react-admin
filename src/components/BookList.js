/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-29 16:33:57
 * @LastEditTime: 2019-11-25 18:26:45
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import { Pagination, Modal,Spin, Button, Radio,Popover,List } from 'antd';
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
      bookname:'',
      loading: false,
      fontSize:'18px',
      bgvalue:'#e9dfc7',
      typevalue:'',
      typeList:[
        '玄幻','修真','都市','其他','网游','历史','科幻','言情'
      ],
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
        type: this.state.typevalue
    }
    axios.post("http://localhost:8080/book/booklist", obj).then(res => {
        this.setState({
          tableData: res.data.data,
          loading:false
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
          bookDetail: res.data.data[0].content.replace(/-/g,'<br/>'),
          bookTitle: res.data.data[0].title
        })
      }
    })
  }
  onpageChange(current, pageSize){
    this.setState({
      page: current,
      pageSize: pageSize,
      loading:true
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
        loading:true
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
      visible: true,
      defaultNum:1,
      bookname: val.name
    },()=>{
      this.getbookDetail();
    })
  }
  fontAdd(){
    this.setState({
      fontSize: (parseInt(this.state.fontSize)+1)+'px'
    })
  }
  fontMin(){
    if(parseInt(this.state.fontSize)<=12) return
    this.setState({
      fontSize: (parseInt(this.state.fontSize)-1)+'px'
    })
  }
  bgChange(e){
    this.setState({
      bgvalue: e.target.value,
    });
  }
  typeChange(e){
    this.setState({
      typevalue: e.target.value,
    },()=>{
      this.getTableData()
    });
  }
 
  render() { 
    return ( 
      <div className="the_table">
        <Spin size="large" spinning={this.state.loading}>
            <h3>爬虫的移动书城</h3>
            <hr/>
            <div style={{overflow:'hidden'}}>
            <Pagination style={{float:'left'}} showSizeChanger onShowSizeChange={this.onShowSizeChange} 
              onChange={this.onpageChange} defaultCurrent={1} total={this.state.allTotal} />
              <div>
                <span >类型</span>
                <Radio.Group onChange={this.typeChange.bind(this)} value={this.state.typevalue}>
                  {
                      this.state.typeList.map((v,i)=>{
                      return (<Radio key={i} value={v}>{v}</Radio>)
                      })
                  }
                </Radio.Group>
              </div>
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

            <Modal title={this.state.bookname} width={'80%'}
                          visible={this.state.visible} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                          maskClosable={false} keyboard={false} >
                            <div className="the_pagination_wrapper">
                              <Pagination className="the_pagi" onChange={this.onpageChange2} defaultCurrent={1} total={100} />
                              <div className="the_tools">
                              <span>字号</span>
                                  <Button onClick={this.fontAdd.bind(this)}>大</Button>
                                  <Button onClick={this.fontMin.bind(this)}>小</Button>
                                  <span >背景</span>
                                  <Radio.Group onChange={this.bgChange.bind(this)} value={this.state.bgvalue}>
                                    <Radio style={{background:'#e9dfc7'}} value={'#e9dfc7'}>A</Radio>
                                    <Radio style={{background:'#e7eee5'}} value={'#e7eee5'}>B</Radio>
                                    <Radio style={{background:'#a4a4a4'}} value={'#a4a4a4'}>C</Radio>
                                    <Radio style={{background:'#cdefcd'}} value={'#cdefcd'}>D</Radio>
                                    <Radio style={{background:'#283548'}} value={'#283548'}>E</Radio>
                                  </Radio.Group>

                              </div>
                            </div>
                                <div className="the_book_wrapper">
                                    <h3>{this.state.bookTitle}</h3>      
                                    {/* <p>{this.state.bookDetail}</p>   */}
                                    <div className="main_content" style={{fontSize: this.state.fontSize, backgroundColor: this.state.bgvalue}} 
                                      dangerouslySetInnerHTML={{__html:this.state.bookDetail}}></div>
                                </div>
                          </Modal>
          </Spin> 
      </div>
     );
  }
}
 
export default BookList;