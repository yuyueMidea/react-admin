/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-29 16:33:57
 * @LastEditTime: 2019-11-26 17:56:13
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import { Pagination, Modal,Spin, Button, Typography,List } from 'antd';
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
      bookDetail:'',
      bookTitle:'',
      bookname:'',
      loading: false,
      initLoading: false,
    }
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
    axios.post("http://localhost:8080/news/listCount", {}).then(res => {
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
    axios.post("http://localhost:8080/news/list", obj).then(res => {
        this.setState({
          tableData: res.data.data,
          loading:false
        })
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
  getDetail(v){
    this.setState({
      bookTitle: v.title,
      bookDetail: v.content.replace(/\n/g,'<br/>'),
      visible: true
    })
  }
  onLoadMore(){
    debugger
    this.setState({
        page: this.state.page,
        pageSize: this.state.pageSize +10,
        loading:true
    },()=>{
      this.getTableData()
    })
  }

  render() { 
    const loadMore =
      !this.state.initLoading && !this.state.loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={this.onLoadMore.bind(this)}>loading more</Button>
        </div>
      ) : null;

    return ( 
      <div className="the_news">
        <Spin size="large" spinning={this.state.loading}>
            <h3>新闻头条</h3>
            <div style={{overflow:'hidden'}}>
            <Pagination style={{float:'left'}} showSizeChanger onShowSizeChange={this.onShowSizeChange}
            pageSizeOptions={['10','20','30','60','100']} 
              onChange={this.onpageChange} defaultCurrent={1} total={this.state.allTotal} />
            </div>
            <hr/>
            <List
              header={<div>Header</div>}
              footer={<div>Footer</div>}
              bordered loadMore={loadMore}
              dataSource={this.state.tableData}
              renderItem={item => (
                <List.Item onClick={this.getDetail.bind(this,item)}>
                  <Typography.Text mark>[{item.keyid}]</Typography.Text>
                  {item.title}</List.Item>
              )}
            />

            <Modal title={this.state.bookTitle} width={800}
                          visible={this.state.visible} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                          maskClosable={false} keyboard={false} >
                                <div className="the_news_wrapper">
                                    <h3>{this.state.bookTitle}</h3>    
                                    <div className="main_content" dangerouslySetInnerHTML={{__html:this.state.bookDetail}}></div>
                                </div>
                          </Modal>
          </Spin> 
      </div>
     );
  }
}
 
export default BookList;