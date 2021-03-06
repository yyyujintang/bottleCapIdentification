import React, { Component } from 'react';

import { Typography, Layout } from 'antd';

import UserController from "../../components/user/UserController";
import TabBarController from "../../components/tab_bar/TabBarController";
import AccountModifyController from "../../components/account/account_modify/AccountModifyController";
import OrderManagementController from "../../components/order/order_management/OrderManagementController";
import CommodityManagementController from "../../components/commodity/commodity_management/CommodityManagementController"
import ShopModifyController from "../../components/shop/shop_modify/ShopModifyController"
import OrderStatisticsController from '../../components/order/order_statistics/OrderStatisticsController';

const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;

class Dealer extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }
    
    parseContent(){
        switch(this.props.items.content){
            case "/dealer":
                return(
                    <div></div>
                )
            case "/dealer/account/myaccount":
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
            case "/dealer/order/myorder":
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
            case "/dealer/shop/mycommodity":
                return(
                    <CommodityManagementController
                        initInfo = {
                            {
                                userId: this.props.items.account.userId,
                            }
                        }
                    />
                )
            case "/dealer/shop/myshop":
                return(
                    <ShopModifyController
                        initInfo = {
                            {
                                userId: this.props.items.account.userId,
                            }
                        }
                    />
                )
            case "/dealer/order/orderstatistics":
                return(
                    <OrderStatisticsController
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
                <div id="dealerDiv">
                    <Layout id="dealerLayot">
                        <Header
                            id="dealerHeader"
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
                        id="dealerLayot"
                        style={{ minHeight: "100vh" }}
                    >
                        <Sider 
                            id="dealerSider"
                            theme="light"
                            width="250"
                            collapsed={false}
                        >
                            <TabBarController
                                functionList={this.props.items.tabBar}
                            />
                        </Sider>
                        <Layout id="dealerLayot">
                            <Content id="dealerContent">
                                {this.parseContent()}
                            </Content>
                            <Footer id="dealerFooter">
                                <Text id="dealerText">
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

export default Dealer;