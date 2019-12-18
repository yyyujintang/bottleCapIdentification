import React, { Component } from "react";

import SuperAdmin from "./SuperAdmin";
import SuperAdminActions from "./SuperAdminActions";
import SuperAdminStore from "./SuperAdminStore";

import "../../css/pages/SuperAdmin.css";

class SuperAdminController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount(){
        SuperAdminStore.addChangeListener(this.onChange);
        SuperAdminActions.initAction();
    }

    componentWillUnmount() {
        SuperAdminStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({
            items: SuperAdminStore.getItems(),
        })
    }

    render() {
        return(
            <SuperAdmin
                items = {this.state.items}
            />
        )
    }
}

export default SuperAdminController;
