import AppDispatcher from "../../dispatcher/AppDispatcher";

var DealerAdminAction = {
    initAction: function(){
        AppDispatcher.dispatch({
            actionType: "DEALER_ADMIN_INIT",
        })
    },
}

export default DealerAdminAction;