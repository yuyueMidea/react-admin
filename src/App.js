/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-29 16:33:56
 * @LastEditTime: 2019-11-21 18:08:08
 * @LastEditors: Please set LastEditors
 */
import React,{Component} from 'react';
import { Layout, Modal, Menu, Icon, List } from 'antd';
import {userVO} from './components/store'
import './bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
// 引入路由
import routes from './routerMap';

// 引入store状态--->toggleSideBar
import {toggleSideBar} from './components/store'
const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

//如果已经登录，不拦截，否则跳转登录页面
class Routers extends Component {
  constructor(props){
    super(props)
    this.state ={
      date: new Date(),
      toggleState: toggleSideBar.getState(),
      collapsed: false,
      userName:'',
      visible: false,
      userV: userVO.getState()||{}
    }
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  getUser(){
    debugger
    this.setState({
      visible: true
    })
  }
  setInfo(){
    userVO.dispatch({type: 'REMOVE'})
    this.setState({
      userV:{}
    })
    // debugger
  }
  logout(){
    this.props.history.push('/login')
  }
  componentDidMount() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.setState({
      userName: userInfo.name||''
    })
  }
  //   我们会在 componentWillUnmount() 生命周期方法中清除计时器
  componentWillUnmount() {
    clearInterval(this.timerID);
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
      <div className="App app-wrapper">
          {
          <Router>
            <Layout>
            <Sider className="left1" trigger={null} collapsible collapsed={this.state.collapsed}>
                  <Menu  onClick={this.handleClick}
                    style={{ width: 199 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"   >
                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>完整示例</span></span>} >
                      {routes.map((v,i)=>
                        <Menu.Item key={i}>
                          <Link to={ v.path || ''}>
                              <span className="nav-text">{v.name}</span>
                          </Link>
                        </Menu.Item>
                      )}
                    </SubMenu>
                    <SubMenu
                      key="sub2"
                      title={ <span> <Icon type="appstore" /> <span>Navigation Two</span> </span>}>
                      <Menu.Item key="5">Option 5</Menu.Item>
                      <Menu.Item key="6">Option 6</Menu.Item>
                      <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                      </SubMenu>
                    </SubMenu>
                    <SubMenu key="sub4" title={ <span> <Icon type="setting" /> <span>Navigation Three</span> </span>}>
                      <Menu.Item key="9">Option 9</Menu.Item>
                      <Menu.Item key="10">Option 10</Menu.Item>
                      <Menu.Item key="11">Option 11</Menu.Item>
                      <Menu.Item key="12">Option 12</Menu.Item>
                      <Menu.Item key="13">Option 13</Menu.Item>
                      <Menu.Item key="14">Option 14</Menu.Item>
                      <Menu.Item key="15">Option 15</Menu.Item>
                      <Menu.Item key="16">Option 16</Menu.Item>
                      <Menu.Item key="17">Option 17</Menu.Item>
                      <Menu.Item key="18">Option 21</Menu.Item>
                      <Menu.Item key="19">Option 22</Menu.Item>
                    </SubMenu>
                  </Menu>
              </Sider>

            <Layout>
                <Header>
                  <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                  />
                  <span>商品秒杀系统</span>
                  <Menu mode="horizontal" style={{ lineHeight: '60px', float: 'right',border: '1px solid #ccc', }}
                          onClick={this.menuClick} >
                          <SubMenu title={this.state.userName}>
                                  <Menu.Item key="setting:2">
                                  <span onClick={this.getUser.bind(this)}>个人信息</span>
                                    </Menu.Item>
                                  <Menu.Item key="logout">
                                      <span onClick={this.logout.bind(this)}>退出登录</span>
                                  </Menu.Item>
                                  <Menu.Item key="setting:3">
                                    <span onClick={this.setInfo.bind(this)}>个人设置</span>
                                  </Menu.Item>
                                  <Menu.Item key="setting:4">系统设置</Menu.Item>
                          </SubMenu>
                          <Modal title="个人信息页面" width={400} wrapClassName="the_user_wrapper"
                          visible={this.state.visible} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                          maskClosable={false} keyboard={false} >
                              {/* <ul className="the_user_info_dis"> */}
                                {
                                  /* Object.entries(this.state.userV).map((v,i)=>{
                                    return <li key={i}>{v[0]}---{v[1]}</li>
                                  }) */
                                   <List bordered size="small" dataSource={Object.entries(this.state.userV)}
                                    renderItem={(item,index)=>(<List.Item>{item[0]}--->{item[1]}</List.Item>)} /> 
                                }
                              {/* </ul> */}
                          </Modal>
                      </Menu>
                </Header>
                <Content >
                      <Switch>
                        {
                          routes.map((v,i)=>
                              <Route key={i} exact path={v.path}
                                render={
                                  props=>v.auth ? (<v.component {...props}/>) : (<Redirect to="/login" />)
                                }
                              />
                              
                          )
                        }
                      </Switch>

                </Content>
              </Layout>
            </Layout>
          </Router>
          }
      
      </div>
     );
  }
}
 
export default Routers;

