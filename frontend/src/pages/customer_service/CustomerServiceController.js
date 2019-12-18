import React, { Component } from "react";

import CustomerService from "./CustomerService";
import CustomerServiceActions from "./CustomerServiceActions";
import CustomerServiceStore from "./CustomerServiceStore";

import "../../css/pages/CustomerService.css";

class CustomerServiceController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount(){
        CustomerServiceStore.addChangeListener(this.onChange);
        CustomerServiceActions.initAction();
    }

    componentWillUnmount() {
        CustomerServiceStore.removeChangeListener(this.onChange);
    }

    onChange() {
        //alert("callback");
        this.setState({
            items: CustomerServiceStore.getItems(),
        })
    }

    render() {
        return(
            <CustomerService
                items = {this.state.items}
            />
        )
    }
}

export default CustomerServiceController;
