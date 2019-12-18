import React, { Component } from "react";

import ConsumerAdmin from "./ConsumerAdmin";
import ConsumerAdminActions from "./ConsumerAdminActions";
import ConsumerAdminStore from "./ConsumerAdminStore";

import "../../css/pages/ConsumerAdmin.css";

class ConsumerAdminController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount(){
        ConsumerAdminStore.addChangeListener(this.onChange);
        ConsumerAdminActions.initAction();
    }

    componentWillUnmount() {
        ConsumerAdminStore.removeChangeListener(this.onChange);
    }

    onChange() {
        //alert("callback");
        this.setState({
            items: ConsumerAdminStore.getItems(),
        })
    }

    render() {
        return(
            <ConsumerAdmin
                items = {this.state.items}
            />
        )
    }
}

export default ConsumerAdminController;
