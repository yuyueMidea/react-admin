/*
 * @Description: In User Settings Edit
 * @Author: yuyue
 * @Date: 2019-10-19 16:17:01
 * @LastEditTime: 2019-11-21 17:14:08
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import {itemTodo} from './store'
import { CSSTransition } from 'react-transition-group'

import PropTypes from 'prop-types';
class Welcome extends Component {
    render() { 
        return ( 
            <h3>Hello, name is---{this.props.name}, age is---{this.props.age}</h3>
         );
    }
}

  Welcome.propTypes ={
      name: PropTypes.string,
      age: PropTypes.string
  }
  Welcome.defaultProps ={
      name:'yuyue',
      age:'28'
  }

//   以前一个组件是通过继承 Component 来构建，一个子类就是一个组件。
  class HelloW extends Component {
      constructor(props){
          super(props)
      }
      sayhi(){
          alert(this.props.age)
      }
      render() { 
          return ( 
              <div onClick={this.sayhi.bind(this)}>hello world</div>
           );
      }
  }

//   用函数式组件的编写方式就是：
  const HelloW2 = (props)=>{
      let sayhi = ()=>{
          alert(props.name)
        }
      return (
          <div onClick={sayhi}>点击sayhi</div>
      )
  }
   
// const data=[
//     '早8点开晨会，分配今天的开发工作',
//     '早9点和项目经理作开发需求讨论会',
//     '晚5:30对今日代码进行review'
// ]
class HelloMsg extends Component {
    state = {  }
    render() { 
        return (<h1>hello--{this.props.name}</h1>)
    }
}

class TodoList extends Component {
    constructor(props){
        super(props)
        this.state = {
            itemArr: itemTodo.getState(),
            inputValue:'请输入',
            isShow: true,
            id:'',
            intName: "12143",
            age: "27",
            list:[
                {cid:123,title:'技术胖的个人博客-1'},
                {cid:456,title:'技术胖的个人博客-2'},
                {cid:789,title:'技术胖的个人博客-3'},
            ],
        }
        this.addInfo = this.addInfo.bind(this)
        this.delInfo = this.delInfo.bind(this)
        this.getVal = this.getVal.bind(this)
        this.toToggole = this.toToggole.bind(this)
    }
    componentDidMount(){
        let tempId=this.props.match.params.id
        this.setState({id:tempId })
    }
    getVal(e){
        this.setState({
            inputValue:  e.target.value
        })
    }
    addInfo() {
        if(!this.state.inputValue) return
        itemTodo.dispatch({type: 'ADD', value:this.state.inputValue})
        this.setState({
            itemArr: itemTodo.getState(),
            inputValue:''
        })
    }
    delInfo(v) {
        itemTodo.dispatch({type: 'MINUS', value: v})
        this.setState({
            itemArr: itemTodo.getState()
        })
    }
    toToggole(){
        this.setState({
            isShow: this.state.isShow ? false :true
        })
    }
    // 
    render() {
       
        return ( 
            <div className="todo-list">
                <HelloW age="28" />
                <HelloW2 name="yuyue112" />
                <Welcome name={this.state.intName} age={this.state.age} />
                <Welcome age="56" />
                <HelloMsg name="zhangsan" />
                <p>{this.state.id}</p>
                <ul>
                    {
                        this.state.list.map((item,index)=>{
                            return (
                                <li key={index}> 
                                <p>
                                {item.title}
                                </p>
                                </li>
                            )
                        })
                    }
                </ul>
                <br/><hr/>
                <span>{this.state.inputValue}</span>
                <p>
                <input type="text" className="form-control" value={this.state.inputValue} placeholder="jspang" style={{width:'250px'}} onChange={this.getVal} />
                <button className="btn btn-primary" onClick={this.addInfo}>增加</button>
                </p>
                <hr/>
                <ul>
                    {
                        this.state.itemArr.map((v,i)=>{
                            return <li key={i}><span>{v}</span><button className="btn btn-danger" onClick={this.delInfo.bind(this,v)}>减少</button></li>
                        })
                    }
                </ul>
                <br/><hr/>
                <CSSTransition 
                    in={this.state.isShow}   //用于判断是否出现的状态
                    timeout={2000}           //动画持续时间
                    classNames="boss-text"   //className值，防止重复
                    unmountOnExit
                >
                    <h2>BOSS级人物-孙悟空</h2>
                </CSSTransition>
                <div><button className="btn btn-info" onClick={this.toToggole}>召唤Boss</button></div>
                <br/><hr/>

            </div>
         );
    }
}
 
export default TodoList;