import React, { Component } from 'react';

import { Typography, Layout } from 'antd';

import UserController from "../../components/user/UserController";
import TabBarController from "../../components/tab_bar/TabBarController";
import AccountModifyController from "../../components/account/account_modify/AccountModifyController";
import MessageManagementController from '../../components/message/message_management/MessageManagementController';

const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;

class CustomerService extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }
    
    parseContent(){
        switch(this.props.items.content){
            case "/customer_service":
                return(
                    <div></div>
                )
            case "/customer_service/account/myaccount":
                return(
                    <AccountModifyController
                        initInfo = {
                            {
                                userId: this.props.items.account.userId,
                                userRoleMaster: this.props.items.account.userRole,
                                userRoleModify: this.props.items.account.userRole,
                            }
                        }
                    />
                )
            case "/customer_service/message/consumermessage":
                return(
                    <MessageManagementController
                        initInfo = {null}
                    />
                )
            default:
                return(
                    <div></div>
                )
        }
    }

    render(){
        if(this.props.items !== null){
            return (
                <div id="customerServiceDiv">
                    <Layout id="customerServiceLayot">
                        <Header
                            id="customerServiceHeader"
                        >
                            <UserController
                                initInfo={
                                    {
                                        username : this.props.items.account.username,
                                        userRole : this.props.items.account.userRole,
                                    }
                                }
                            />
                        </Header>
                    </Layout>
                    <Layout 
                        id="customerServiceLayot"
                        style={{ minHeight: "100vh" }}
                    >
                        <Sider 
                            id="customerServiceSider"
                            theme="light"
                            width="250"
                            collapsed={false}
                        >
                            <TabBarController
                                functionList={this.props.items.tabBar}
                            />
                        </Sider>
                        <Layout id="customerServiceLayot">
                            <Content id="customerServiceContent">
                                {this.parseContent()}
                            </Content>
                            <Footer id="customerServiceFooter">
                                <Text id="customerServiceText">
                                    Neighborhood Purchase ©2019 Created by NO.2 Team
                                </Text>
                            </Footer>
                        </Layout>
                    </Layout>
                </div>
            )
        }
        return (
            <div></div>
        )
    }
}

export default CustomerService;