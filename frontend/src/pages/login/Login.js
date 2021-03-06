import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Card ,Row ,Col ,Cascader ,Button ,Typography ,Input } from 'antd';
const { Text } = Typography;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }

    handleChange(key, value){
        this.props.handleChange(key, value);
    }

    finishLogin(){
        this.props.finishLogin();
    }
    
    render(){
        if(this.props.items !== null){
            if(!this.props.items.loginState){
                return (
                    <div id="loginDiv">
                        <Card 
                            id="loginCard" 
                            title={this.props.items.constText.title}
                        >
                            <Row id="loginRow">
                                <Col id="loginCol" span={6}>
                                    <Text id="loginText">
                                        {this.props.items.constText.username}
                                    </Text>
                                </Col>
                                <Col id="loginCol" span={18}>
                                    <Input 
                                        id="loginUsenameInput"
                                        placeholder={this.props.items.constText.usernamePlaceholder} 
                                        onChange={(e) => this.handleChange("username", e.target.value)}
                                    >
                                    </Input>
                                </Col>
                            </Row>
                            <Row id="loginRow">
                                <Col id="loginCol" span={6}>
                                    {/*empty*/}
                                </Col>
                                <Col id="loginCol" span={18}>
                                    <Text 
                                        id="loginRemindText"
                                        disabled
                                    >
                                        {this.props.items.usernameRemindText}
                                    </Text>
                                </Col>
                            </Row>
                            <Row id="loginRow">
                                <Col id="loginCol" span={6}>
                                    <Text id="loginText">
                                        {this.props.items.constText.password}
                                    </Text>
                                </Col>
                                <Col id="loginCol" span={18}>
                                    <Input 
                                        id="loginPasswordInput" 
                                        placeholder={this.props.items.constText.passwordPlaceholder} 
                                        type="password"
                                        onChange={(e) => this.handleChange("password", e.target.value)}
                                    >
                                    </Input>
                                </Col>
                            </Row>
                            <Row id="loginRow">
                                <Col id="loginCol" span={6}>
                                    {/*empty*/}
                                </Col>
                                <Col id="loginCol" span={18}>
                                    <Text 
                                        id="loginRemindText"
                                        disabled
                                    >
                                        {this.props.items.passwordRemindText}
                                    </Text>
                                </Col>
                            </Row>
                            <Row id="loginRow">
                                <Col id="loginCol" span={6}>
                                    <Text id="loginText">
                                        {this.props.items.constText.usertype}
                                    </Text>
                                </Col>
                                <Col id="loginCol" span={18}>
                                    <Cascader
                                        id="loginUsertypeCascader"
                                        options={this.props.items.usertypes}
                                        placeholder={this.props.items.constText.usertypePlaceholder}
                                        onChange={(value) => this.handleChange("usertype", value[0])} 
                                    >
                                    </Cascader>
                                </Col>
                            </Row>
                            <Row id="loginRow">
                                <Col id="loginCol" span={24}>
                                    {/*empty*/}
                                </Col>
                            </Row>
                            <Row id="loginRow">
                                <Col id="loginCol" span={24}>
                                    <Button 
                                        id="finishLoginButton" 
                                        type="Button" 
                                        onClick={() => this.finishLogin()} 
                                    >
                                        {this.props.items.constText.login}
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                )
            }
            else{
                return (
                    <Redirect to={this.props.items.url}/>
                )
            }
        }
        return (
            <div></div>
        )
    }
}

export default Login;