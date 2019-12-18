import AppDispatcher from "../../../dispatcher/AppDispatcher";

var MessageListAction = {
    initAction: function(initInfo){
        
        AppDispatcher.dispatch({
            actionType: "MESSAGE_LIST_INIT",
            initInfo: initInfo,
        })
    },  
}

export default MessageListAction;