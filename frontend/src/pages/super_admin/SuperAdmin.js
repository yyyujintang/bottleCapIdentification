import React, { Component } from 'react';

import { Typography, Layout } from 'antd';

import UserController from "../../components/user/UserController";
import TabBarController from "../../components/tab_bar/TabBarController";
import AccountModifyController from "../../components/account/account_modify/AccountModifyController";
import AccountManagementController from "../../components/account/account_management/AccountManagementController";

const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;

class SuperAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    parseContent() {
        switch (this.props.items.content) {
            case "/super_admin":
                return (
                    <div></div>
                )
            case "/super_admin/account/myaccount":
                return (
                    <AccountModifyController
                        initInfo={
                            {
                                userId: this.props.items.account.userId,
                                userRoleMaster: this.props.items.account.userRole,
                                userRoleModify: this.props.items.account.userRole,
                            }
                        }
                    />
                )
            case "/super_admin/account/account_management/dealer_admin":
                return (
                    <AccountManagementController
                        initInfo={
                            {
                                userRoleMaster: this.props.items.account.userRole,
                                userRoleModify: "dealerAdmin",
                            }
                        }
                    />
                )
            case "/super_admin/account/account_management/consumer_admin":
                return (
                    <AccountManagementController
                        initInfo={
                            {
                                userRoleMaster: this.props.items.account.userRole,
                                userRoleModify: "consumerAdmin",
                            }
                        }
                    />
                )
            case "/super_admin/account/account_management/customer_service":
                return (
                    <AccountManagementController
                        initInfo={
                            {
                                userRoleMaster: this.props.items.account.userRole,
                                userRoleModify: "customerService",
                            }
                        }
                    />
                )
            default:
                return (
                    <div></div>
                )
        }
    }

    render() {
        if (this.props.items !== null) {
            return (
                <div id="consumerAdminDiv">
                    <Layout id="consumerAdminLayot">
                        <Header
                            id="consumerAdminHeader"
                        >
                            <UserController
                                initInfo={
                                    {
                                        username: this.props.items.account.username,
                                        userRole: this.props.items.account.userRole,
                                    }
                                }
                            />
                        </Header>
                    </Layout>
                    <Layout
                        id="consumerAdminLayot"
                        style={{ minHeight: "100vh" }}
                    >
                        <Sider
                            id="consumerAdminSider"
                            theme="light"
                            width="250"
                            collapsed={false}
                        >
                            <TabBarController
                                functionList={this.props.items.tabBar}
                            />
                        </Sider>
                        <Layout id="consumerAdminLayot">
                            <Content id="consumerAdminContent">
                                {this.parseContent()}
                            </Content>
                            <Footer id="consumerAdminFooter">
                                <Text id="consumerAdminText">
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

export default SuperAdmin;