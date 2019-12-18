import AppDispatcher from "../../dispatcher/AppDispatcher";

var CustomerServiceAction = {
    initAction: function(){
        AppDispatcher.dispatch({
            actionType: "CUSTOMER_SERVICE_INIT",
        })
    },
}

export default CustomerServiceAction;