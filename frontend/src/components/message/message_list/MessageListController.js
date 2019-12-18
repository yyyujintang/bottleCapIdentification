import React, { Component } from "react";

import MessageList from "./MessageList";
import MessageListActions from "./MessageListActions";
import MessageListStore from "./MessageListStore";

class MessageListController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
        this.toMessageModify = this.toMessageModify.bind(this);
    }
    
    componentDidMount(){
        MessageListStore.addChangeListener(this.onChange);
        MessageListActions.initAction(this.props.initInfo);
    }

    componentWillUnmount() {
        MessageListStore.removeChangeListener(this.onChange);
    }
    
    onChange() {
        this.setState({
            items: MessageListStore.getItems(),
        })
    }

    toMessageModify(MessageId){
        this.props.toMessageModify(MessageId);
    }

    render() {
        return(
        <MessageList
            items = {this.state.items}
            toMessageModify = {this.toMessageModify}
        />
        )
    }
}

export default MessageListController;



  
