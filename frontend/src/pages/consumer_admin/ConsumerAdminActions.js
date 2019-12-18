import AppDispatcher from "../../dispatcher/AppDispatcher";

var ConsumerAdminAction = {
    initAction: function(){
        AppDispatcher.dispatch({
            actionType: "CONSUMER_ADMIN_INIT",
        })
    },
}

export default ConsumerAdminAction;