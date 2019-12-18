import React, { Component } from "react";

import TabBar from "./TabBar";
import TabBarActions from "./TabBarActions";
import TabBarStore from "./TabBarStore";

class TabBarController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
        this.controllerOnFunctionButtonClick = this.controllerOnFunctionButtonClick.bind(this);
    }
    
    componentDidMount(){
        
        TabBarStore.addChangeListener(this.onChange);
        //console.log(this.props.functionList);
        TabBarActions.initAction(this.props.functionList);
        
    }

    componentWillUnmount() {
        TabBarStore.removeChangeListener(this.onChange);
    }
    
    onChange() {
        //alert("callback");
        this.setState({
            items: TabBarStore.getItems(),
        })
    }

    controllerOnFunctionButtonClick(e){
        //alert("con");
        TabBarActions.onFunctionButtonClickAction(e);
    }

    render() {
        return(
        <TabBar
            items = {this.state.items}
            onFunctionButtonClick = {this.controllerOnFunctionButtonClick}
        />
        )
    }
}

export default TabBarController;


