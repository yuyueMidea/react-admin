/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-29 16:33:56
 * @LastEditTime: 2019-11-21 16:20:34
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import './App.css';
// import store from './store'
import axios from 'axios';
import {userVO} from './components/store'
import { Form, Icon, Input, Button, message } from 'antd';
const FormItem = Form.Item;

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        date: new Date(),
        name:'',
        pwd:'',
      };
      this.login=this.login.bind(this)
    }
    handleSubmit = ()=>{
      let userInfo = this.props.form.getFieldsValue();
      this.props.form.validateFields((err,values)=>{
          if(!err){
            this.login(userInfo)
          }
      })
    }
    login(val){
      let param = new URLSearchParams()
      param.append("telphone", val.name)
      param.append("password", val.pwd)
      axios.post("http://localhost:8080/user/login", param).then(res=>{
          if(res.data.status == "success"){
            message.success(`${val.name}欢迎您 ，当前密码为：${val.pwd}`)
            localStorage.setItem('userInfo',JSON.stringify(val));
            localStorage.setItem('userObj',JSON.stringify(res.data.data));
            userVO.dispatch({type: 'NEW', value: res.data.data})
            this.props.history.push('/app')
          } else {
            message.error('登录失败，用户名或密码错误！')
          }
      })
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <div className="the_login">
          <Form layout="inline" style={{width:300}}>
              <FormItem>
                  {getFieldDecorator('name',{
                          initialValue:'',
                          rules:[ {
                                  required:true,
                                  message:'手机不能为空'
                              }, ]
                  })(<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入手机"  style={{width:255}}/>)}
              </FormItem>
              <FormItem>
                  {getFieldDecorator('pwd',{
                          initialValue:'',
                          rules:[ {
                                  required:true,
                                  message:'密码不能为空'
                              }, ]
                  })(<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="请输入密码"  style={{width:255}}/>)}
              </FormItem>
              <FormItem>
                  <Button type="primary" onClick={this.handleSubmit} style={{width:255}} >登录</Button>
              </FormItem>
          </Form>
          
        </div>
      );
    }
  }
  export default Form.create()(Login);
