import React, { Component } from 'react';
import { List, Skeleton, Avatar, Button, Input, Typography } from 'antd';

const { Search } = Input;
const { Text } = Typography;

class MessageModify extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    /*action*/
    handleChange(key, value) {
        this.props.handleChange(key, value);
    }
    /*render*/
    render() {
        if (this.props.items !== null) {


            var i = -1;
            console.log(this.props.items);
            return (
                <div id="messageModifyDiv">
                    <List
                        bordered={true}
                        itemLayout="horizontal"
                        dataSource={this.props.items.messages}
                        renderItem={item => {
                            i++;
                            return (
                                <List.Item>
                                    <Skeleton title={false} loading={item.loading} active>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar src={
                                                    this.props.items.messages[i].resource ? "http://202.120.40.8:30492/image/default_avatar.jpg" : "http://202.120.40.8:30492/image/customerService.PNG"
                                                }
                                                />
                                            }
                                            title={
                                                this.props.items.messages[i].time + "   " + (
                                                    this.props.items.messages[i].resource ? "消费者:" : "客服:"
                                                )
                                            }
                                            description={this.props.items.messages[i].content}
                                        />
                                        {
                                            !this.props.items.messages[i].status ?
                                                (
                                                    this.props.items.messages[i].resource ?
                                                        (
                                                            <Button
                                                                type="link"
                                                                
                                                                onClick={value => this.handleChange("tab", value)}

                                                            >
                                                                确认已读
                                                            </Button>
                                                        )
                                                        :
                                                        (
                                                            <Text>
                                                                未读
                                                            </Text>
                                                        )

                                                )
                                                :
                                                (
                                                    <Text>
                                                        已读
                                                    </Text>
                                                )
                                        }
                                    </Skeleton>
                                </List.Item>
                            )
                        }}
                    />
                    <Search
                        placeholder="回复..."
                        enterButton="发送"
                        
                        onSearch={value => this.handleChange("send", value)}
                        onChange={e => this.handleChange("content", e.target.value)}
                        value={this.props.items.value}
                    />

                </div>
            );
        }
        return (
            <div></div>
        );
    }
}

export default MessageModify;





