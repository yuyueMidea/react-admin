/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-29 16:33:57
 * @LastEditTime: 2019-11-26 18:12:26
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import { Pagination, Modal,Spin, Button, Collapse } from 'antd';
import axios from 'axios';
const { Panel } = Collapse;

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
    axios.post("http://localhost:8080/companylist/listCount", {}).then(res => {
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
    axios.post("http://localhost:8080/companylist/list", obj).then(res => {
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

  render() { 
    return ( 
      <div className="the_company_list">
        <Spin size="large" spinning={this.state.loading}>
            <h3>公司一览</h3>
            <div style={{overflow:'hidden'}}>
            <Pagination style={{float:'left'}} showSizeChanger onShowSizeChange={this.onShowSizeChange}
            pageSizeOptions={['10','20','30','60','100']} 
              onChange={this.onpageChange} defaultCurrent={1} total={this.state.allTotal} />
            </div>
            <hr/>
            <Collapse accordion>
              {
                this.state.tableData.map((v,i)=>{
                  return (<Panel header={v.name} key={i}>
                            <ul className="the_com_intro">
                                <li>[公司简称]<a href={'http://'+v.website} target="_blank" >{v.code}</a></li>
                                <li>[公司地址]{v.address}</li>
                            </ul>
                            <div className="the_text">{v.intro}</div>
                          </Panel>)
                })
              }
            </Collapse>
            <p>footer</p>
          </Spin> 
      </div>
     );
  }
}
 
export default BookList;