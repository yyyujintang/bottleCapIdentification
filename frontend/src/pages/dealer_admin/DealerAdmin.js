import React, { Component } from 'react';

import { Typography, Layout } from 'antd';

import UserController from "../../components/user/UserController";
import TabBarController from "../../components/tab_bar/TabBarController";
import AccountModifyController from "../../components/account/account_modify/AccountModifyController";
import AccountManagementController from "../../components/account/account_management/AccountManagementController";
import OrderManagementController from "../../components/order/order_management/OrderManagementController";
import TagModifyController from "../../components/tag/tag_modify/TagModifyController"

const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;

class DealerAdmin extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }
    
    parseContent(){
        switch(this.props.items.content){
            case "/dealer_admin":
                return(
                    <div></div>
                )
            case "/dealer_admin/account/myaccount":
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
            case "/dealer_admin/account/account_management/dealer":
                return (
                    <AccountManagementController
                        initInfo = {
                            {
                                userRoleMaster: this.props.items.account.userRole,
                                userRoleModify: "dealer",
                            }
                        }
                    />
                )
            case "/dealer_admin/order/all_order":
                return(
                    <OrderManagementController
                        initInfo = {
                            {
                                userId: this.props.items.account.userId,
                                userRole: this.props.items.account.userRole,
                            }
                        }
                    />
                )
            case "/dealer_admin/commodity/tag":
                return(
                    <TagModifyController/>
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
                <div id="dealerAdminDiv">
                    <Layout id="dealerAdminLayot">
                        <Header
                            id="dealerAdminHeader"
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
                        id="dealerAdminLayot"
                        style={{ minHeight: "100vh" }}
                    >
                        <Sider 
                            id="dealerAdminSider"
                            theme="light"
                            width="250"
                            collapsed={false}
                        >
                            <TabBarController
                                functionList={this.props.items.tabBar}
                            />
                        </Sider>
                        <Layout id="dealerAdminLayot">
                            <Content id="dealerAdminContent">
                                {this.parseContent()}
                            </Content>
                            <Footer id="dealerAdminFooter">
                                <Text id="dealerAdminText">
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

export default DealerAdmin;