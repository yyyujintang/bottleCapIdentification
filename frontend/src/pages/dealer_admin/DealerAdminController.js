import React, { Component } from "react";

import DealerAdmin from "./DealerAdmin";
import DealerAdminActions from "./DealerAdminActions";
import DealerAdminStore from "./DealerAdminStore";

import "../../css/pages/DealerAdmin.css";

class DealerAdminController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : null,
        };
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount(){
        DealerAdminStore.addChangeListener(this.onChange);
        DealerAdminActions.initAction();
    }

    componentWillUnmount() {
        DealerAdminStore.removeChangeListener(this.onChange);
    }

    onChange() {
        //alert("callback");
        this.setState({
            items: DealerAdminStore.getItems(),
        })
    }

    render() {
        return(
            <DealerAdmin
                items = {this.state.items}
            />
        )
    }
}

export default DealerAdminController;
