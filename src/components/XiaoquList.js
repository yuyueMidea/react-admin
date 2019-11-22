/*
 * @Author: your name
 * @Date: 2019-11-20 08:27:36
 * @LastEditTime: 2019-11-20 11:51:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo-app\src\components\XiaoquList.js
 */
import React, { Component } from 'react';

import { Table,Select  } from 'antd';
import axios from 'axios';
const { Option } = Select;
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
   },{
    title: '城市',
    dataIndex: 'city',
    width: 150,
   },{
    title: '区域',
    dataIndex: 'district',
    width: 150,
  },{
    title: '小区',
    dataIndex: 'xiaoqu',
  },{
    title: '价格',
    dataIndex: 'price',
    width: 150,
  },{
    title: '销量',
    dataIndex: 'sale',
    width: 150,
  },{
    title: '日期',
    dataIndex: 'date',
    width: 150,
  },
];


class XiaoquList extends Component {
    constructor(props){
        super(props)
        this.state ={
            tableData: [],
            resData:[],
            allCount:0,
            "page":1,
            "pageSize":15,
            province:'',
            city:'',
            country:'',
            town:'',
            provinceOptions:[],
            cityOptions:[],
            countryOptions:[],
            townOptions:[],
        }
        this.getXiaoqu = this.getXiaoqu.bind(this);
        this.getXiaoquCount = this.getXiaoquCount.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.getprovinceData = this.getprovinceData.bind(this);
        this.getcityData = this.getcityData.bind(this);
        this.getcountryData = this.getcountryData.bind(this);
        this.gettownData = this.gettownData.bind(this);
        this.gettown = this.gettown.bind(this);
        
    }
    componentWillMount(){
        this.getXiaoqu()
        this.getXiaoquCount()
        this.getprovinceData()
    }
    getXiaoquCount(){
        axios.post('http://localhost:8080/xiaoqu/listCount',{}).then(v=>{
                if(v.data.status==='success'){
                    this.setState({
                        allCount: v.data.data
                    })
                }
		})
    }
    getprovinceData(){
        axios.post("http://localhost:8080/province/list",{}).then(v=>{
                if(v.data.status==='success'){
                    this.setState({
                        provinceOptions: v.data.data
                    })
                }
		})
    }
    getcityData(val){
        debugger
        if(!val) return
        axios.post("http://localhost:8080/city/list",{provinceId: val}).then(v=>{
                if(v.data.status==='success'){
                    this.setState({
                        cityOptions: v.data.data,
                        province: val,
                    })
                }
		})
    }
    getcountryData(val){
        if(!val) return
        axios.post("http://localhost:8080/country/list",{cityId: val}).then(v=>{
                if(v.data.status==='success'){
                    this.setState({
                        countryOptions: v.data.data,
                        city:val,
                    })
                }
		})
    }
    gettownData(val){
        if(!val) return
        axios.post("http://localhost:8080/town/list",{countryId: val}).then(v=>{
                if(v.data.status==='success'){
                    this.setState({
                        townOptions: v.data.data,
                        country:val,
                    })
                }
		})
    }
    gettown(val){
        let towndata = this.state.townOptions.find(v=>v.townId==val)
        // console.log('tag', towndata)
        if(!val) return
        this.setState({
            town: val
        })
    }
    
    getXiaoqu(){
        let params ={
            "page": this.state.page,
            "pageSize": this.state.pageSize
        }
        axios.post('http://localhost:8080/xiaoqu/list',params).then(v=>{
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
            this.getXiaoqu()
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
            <div className="the_xiaoqu_list">
                <div>
                    <Select className="sel1" style={{ width: 220 }} onChange={this.getcityData} allowClear={true} value={this.state.province} >
                        {
                            this.state.provinceOptions.map((v,i)=>{
                                return <Option key={i} value={v.provinceId}>{v.name}</Option>
                            })
                        }
                    </Select>
                    <Select className="sel2" style={{ width: 220 }} onChange={this.getcountryData} allowClear={true} value={this.state.city} >
                        {
                            this.state.cityOptions.map((v,i)=>{
                                return <Option key={i} value={v.cityId}>{v.name}</Option>
                            })
                        }
                    </Select>
                    <Select className="sel3" style={{ width: 220 }} onChange={this.gettownData} allowClear={true} value={this.state.country}>
                        {
                            this.state.countryOptions.map((v,i)=>{
                                return <Option key={i} value={v.countryId}>{v.name}</Option>
                            })
                        }
                    </Select>
                    <Select className="sel4" style={{ width: 220 }} onChange={this.gettown} allowClear={true} value={this.state.town} >
                        {
                            this.state.townOptions.map((v,i)=>{
                                return <Option key={i} value={v.townId}>{v.name}</Option>
                            })
                        }
                    </Select>
                </div>
                <h3>小区价格一览    
                    <button className="btn btn-info" onClick={this.getXiaoquCount}>获取小区总数</button>
                    <button className="btn btn-info" onClick={this.getXiaoqu}>获取小区</button>
                </h3>
                <Table rowKey="id" dataSource={this.state.tableData} columns={columns} 
                        pagination={paginationProps}
                        size="small" bordered />
            </div>
         );
    }
}
 
export default XiaoquList;