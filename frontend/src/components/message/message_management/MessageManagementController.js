import React, { Component } from "react";

import MessageManagement from "./MessageManagement";
import MessageManagementActions from "./MessageManagementActions";
import MessageManagementStore from "./MessageManagementStore";

class MessageManagementController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount(){
        MessageManagementStore.addChangeListener(this.onChange);
        MessageManagementActions.initAction(this.props.initInfo);
    }

    componentWillUnmount() {
        MessageManagementStore.removeChangeListener(this.onChange);
    }
    
    onChange() {
        this.setState({
            items: MessageManagementStore.getItems(),
        })
    }

    toMessageModify(consumerId){
        console.log(consumerId);
        MessageManagementActions.toMessageModifyAction(consumerId);
    }

    toMessageList(){
        MessageManagementActions.toMessageListAction();
    }

    render() {
        return(
        <MessageManagement
            items = {this.state.items}
            toMessageModify = {this.toMessageModify.bind(this)}
            toMessageList = {this.toMessageList.bind(this)}
        />
        )
    }
}

export default MessageManagementController;


