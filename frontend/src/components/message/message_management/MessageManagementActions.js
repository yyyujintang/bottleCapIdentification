import AppDispatcher from "../../../dispatcher/AppDispatcher";

var MessageManagementAction = {
    initAction: function(initInfo){
        AppDispatcher.dispatch({
            actionType: "MESSAGE_MANAGEMENT_INIT",
            initInfo: initInfo,
        });
    },

    toMessageModifyAction: function(consumerId){
        
        AppDispatcher.dispatch({
            actionType: "MESSAGE_MANAGEMENT_TO_MESSAGE_MODIFY",
            consumerId : consumerId,
        });
    },
    
    toMessageListAction: function(){
        AppDispatcher.dispatch({
            actionType: "MESSAGE_MANAGEMENT_TO_MESSAGE_LIST",
        });
    }
}

export default MessageManagementAction;