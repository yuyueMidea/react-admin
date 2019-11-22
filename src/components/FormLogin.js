/*
 * @Author: your name
 * @Date: 2019-11-21 09:19:50
 * @LastEditTime: 2019-11-21 11:36:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo-app\src\components\FormLogin.js
 */
import React from "react";
import {  Form, Input, Button, Modal, Icon, Checkbox } from "antd";
const FormItem = Form.Item;
class FormLogin extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            visible: false,
            receiveObj: ''
        }
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.openDialog = this.openDialog.bind(this)
    }
    handleSubmit = ()=>{
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err,values)=>{
            if(!err){
                // message.success(`${userInfo.title}欢迎您 ，当前密码为：${userInfo.userPwd}`)
                this.props.sentFormVal(userInfo)
                this.props.form.resetFields();
                this.setState({
                    visible: false,
                });
            }
        })
    }
    openDialog(){
        debugger//this.props.formVal
        let receiveObj ={}
        if(this.props.formVal){
            receiveObj ={
                id: this.props.formVal.id,
                title: this.props.formVal.title,
                imgUrl: this.props.formVal.imgUrl,
                description: this.props.formVal.description,
                price: this.props.formVal.price,
                stock: this.props.formVal.stock,
            }
        }
        this.props.form.setFieldsValue(receiveObj);
        this.setState({
            visible: true
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

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="the_item_modal" >
                <Button type="primary" onClick={this.openDialog}>新增(修改)</Button>
                <Modal
                    title="商品详情页面" width={600} wrapClassName="the_item_wrapper"
                    visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}
                    maskClosable={false} keyboard={false} >
                       
                    <Form layout="inline" style={{width:300}}>
                        <FormItem>
                            {getFieldDecorator('title',{
                                    initialValue:'',
                                    rules:[ {
                                            required:true,
                                            message:'标题不能为空'
                                        }, ]
                            })(<Input placeholder="请输入标题"  style={{width:255}}/>)}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('imgUrl',{
                                    initialValue:'',
                                    rules:[ {
                                            required:true,
                                            message:'图片路径不能为空'
                                        }, ]
                            })(<Input placeholder="请输入图片路径"  style={{width:255}}/>)}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('description',{
                                    initialValue:'',
                                    rules:[ {
                                            required:true,
                                            message:'描述不能为空'
                                        }, ]
                            })(<Input placeholder="请输入描述"  style={{width:255}}/>)}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('price',{
                                    initialValue:'',
                                    rules:[ {
                                            required:true,
                                            message:'价格不能为空'
                                        }, ]
                            })(<Input placeholder="请输入价格" style={{width:255}} />)}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('stock',{
                                    initialValue:'',
                                    rules:[ {
                                            required:true,
                                            message:'库存不能为空'
                                        }, ]
                            })(<Input placeholder="请输入库存"  style={{width:255}}/>)}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('id')(<Input disabled  style={{width:255}}/>)}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit} style={{width:255}} >登录</Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(FormLogin);