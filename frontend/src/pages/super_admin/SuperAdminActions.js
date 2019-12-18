import AppDispatcher from "../../dispatcher/AppDispatcher";

var SuperAdminAction = {
    initAction: function(){
        AppDispatcher.dispatch({
            actionType: "SUPER_ADMIN_INIT",
        })
    },
}

export default SuperAdminAction;