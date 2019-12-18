import React, { Component } from "react";

import { Table, Button } from "antd";

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }

    toMessageModify(messageId){
        this.props.toMessageModify(messageId);
    }

    getTableColumns(){
        return(
            [
                {
                    title: "消费者编号",
                    dataIndex: "id",
                    key: "id",
                    sorter: (a, b) => a.id - b.id,
                },
                {
                    title: "消费者用户名",
                    dataIndex: "username",
                    key: "username",
                    sorter: (a, b) => (a.username > b.username ? 1 : -1 ),
                },
                {
                    key: "action",
                    render: (text, record) => (
                        <Button 
                            id="toMessageModifyButton"
                            onClick={() => this.toMessageModify(record.id)}    
                        >
                            回复
                        </Button>
                    ),
                },
            ]
        );
    }

    render(){
        if(this.props.items != null){
            return (
                <div id="messageListDiv">
                    <Table 
                        columns={this.getTableColumns()} 
                        dataSource={this.props.items.messageList} 
                    />
                </div>
            );
        }
        return (
            <div></div>
        );
    }
}

export default MessageList;





