import React, { Component } from "react";

import MessageModify from "./MessageModify";
import MessageModifyActions from "./MessageModifyActions";
import MessageModifyStore from "./MessageModifyStore";

//import "../../../css/components/message/MessageModify.css"

class MessageModifyController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount(){
        MessageModifyStore.addChangeListener(this.onChange);
        MessageModifyActions.initAction(this.props.initInfo);
        
    }

    componentWillUnmount() {
        MessageModifyStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({
            items: MessageModifyStore.getItems(),
        });
    }
    
    handleChange(key, value){
        MessageModifyActions.handleChangeAction(key, value);
    }

    render() {
        return(
        <MessageModify
            items = {this.state.items}
            handleChange = {this.handleChange.bind(this)}
        />
        )
    }
}

export default MessageModifyController;


