/*
 * @Author: your name
 * @Date: 2019-11-20 08:27:36
 * @LastEditTime: 2019-11-21 11:34:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo-app\src\components\ItemList.js
 */
import React, { Component } from 'react';

import { Table,Button ,Input,message ,Modal } from 'antd';
import axios from 'axios';
import FormLogin from './FormLogin'

const { Search } = Input;
const { confirm } = Modal;
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
   },{
    title: '商品名称',
    dataIndex: 'title',
    width: 150,
   },{
    title: '商品图片',
    dataIndex: 'imgUrl',
    width: 150,
    render: imgUrl =>(
        <img className="item_img" src={imgUrl} />
    )
  },{
    title: '商品描述',
    dataIndex: 'description',
  },{
    title: '价格',
    dataIndex: 'price',
    width: 150,
  },{
    title: '销量',
    dataIndex: 'sale',
    width: 150,
  },
];


class ItemList extends Component {
    constructor(props){
        super(props)
        this.state ={
            tableData: [],
            resData:[],
            allCount:0,
            "page":1,
            "pageSize":15,
            currentRow:'',
            visibleFlag: false,
        }
        this.addNew = this.addNew.bind(this);
        this.editOne = this.editOne.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.getItem = this.getItem.bind(this);
        this.getItemCount = this.getItemCount.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        
        this.getFormVal = this.getFormVal.bind(this)
    }
    componentWillMount(){
        this.getItem()
        this.getItemCount()
    }
    getItemCount(){
        let param = new URLSearchParams()
            param.append('title', this.searchtext )
        axios.post('http://localhost:8080/item/listCount', param).then(v=>{
                if(v.data.status==='success'){
                    this.setState({
                        allCount: v.data.data
                    })
                }
		})
    }
    addNew(v){
        this.setState({
            visibleFlag: true,
        });
        // debugger
    }
    getFormVal(val){
        let param = new URLSearchParams()
        for(let i in val){
            param.append(i, val[i]||'')
        }
        debugger
        axios.post("http://localhost:8080/item/create", param ).then(res => {
            message.success('数据保存成功');
            this.getItem()
        })
    }
    editOne(v){
        if(!this.state.currentRow){
            return message.error('请选择一条数据！');
        }
        debugger
    }
    deleteRow(){
        if(!this.state.currentRow){
            return message.error('请选择一条数据！');
        }
        confirm({
            title: '确认删除吗？',
            // content: '确认信息',
            onOk:()=> {
                let param = new URLSearchParams()
                param.append("idList", this.state.currentRow.id)
                axios.post('http://localhost:8080/item/delete',param).then(v=>{
                        if(v.data.status==='success'){
                            message.success('删除数据成功！');
                            this.getItem()
                        }
                })
            },
            onCancel() {
              console.log('Cancel');
            },
          });

        
    }
    getItem(v){
        let param = new URLSearchParams()
        param.append('title', v||'' )
        axios.post('http://localhost:8080/item/list',param).then(v=>{
                if(v.data.status==='success'){
                    this.setState({
                        tableData: v.data.data
                    })
                }
		})
    }
    handleTableChange(val){
        this.setState({
            page: val
        },()=>{
            this.getItem()
        })
        
    }
    ClickTest(val){
        this.setState({
            currentRow: val
        })
    }
    
 
    render() { 
        const paginationProps = {
            page: this.state.page,
            pageSize: this.state.pageSize,
            onChange : (page) => this.handleTableChange(page),
            total: this.state.allCount,
        }
        return ( 
            <div className="the_item_list">
                <h3>商品一览  
                    <Search placeholder="请输入商品名称" onSearch={v=>this.getItem(v)} style={{ width: 200 }} />
                    {/* <Button type="primary" onClick={this.addNew}>新增</Button>
                    <Button type="primary" onClick={this.editOne}>修改</Button> */}
                    <Button type="primary" onClick={this.deleteRow}>删除</Button>
                    <FormLogin formVal={this.state.currentRow} sentFormVal={this.getFormVal} />
                </h3>
               
                <Table rowKey="id" dataSource={this.state.tableData} columns={columns} 
                        pagination={paginationProps}
                        onRow={record => {
                            return {
                              onClick: this.ClickTest.bind(this, record), // 点击行
                              onContextMenu: event => {},
                              onMouseEnter: event => {}, // 鼠标移入行
                              onMouseLeave: event => {},
                            };
                          }}
                        size="small" bordered />
                
                

            </div>
         );
    }
}
 
export default ItemList;