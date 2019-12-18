import React, { Component } from 'react';

import MessageModifyController from "../message_modify/MessageModifyController";
import MessageListController from "../message_list/MessageListController"
import { Button } from 'antd';

class MessageManagement extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }

    toMessageModify(messageId){
        this.props.toMessageModify(messageId);
    }

    toMessageList(){
        this.props.toMessageList();
    }

    render(){
        //console.log(this.props.items);
        if(this.props.items != null){
            return (
                <div id="MessageManagementDiv">
                    {
                        this.props.items.showState === "list" ?
                        (
                            <MessageListController
                                initInfo={null}
                                toMessageModify={this.toMessageModify.bind(this)}
                            />
                        )
                        :
                        (
                            <div id="MessageManagementModifyDiv">
                                <Button
                                    id="toMessageListButton"
                                    type="link"
                                    onClick={this.toMessageList.bind(this)}
                                >
                                    返回消息列表
                                </Button>
                                <MessageModifyController
                                    initInfo={
                                        {
                                            consumerId: this.props.items.selectedConsumerId,
                                        }
                                    }
                                />
                            </div>                            
                        )
                    }
                </div>
            );
        }
        return (
            <div></div>
        );
    }
}

export default MessageManagement;





