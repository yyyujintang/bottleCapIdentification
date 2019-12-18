import AppDispatcher from "../../../dispatcher/AppDispatcher";

var MessageModifyAction = {
    initAction: function(initInfo){
        AppDispatcher.dispatch({
            actionType: "MESSAGE_MODIFY_INIT",
            initInfo: initInfo,
        });
    },

    handleChangeAction: function(key, value){
        AppDispatcher.dispatch({
            actionType: "MESSAGE_MODIFY_HANDLE_CHANGE",
            key: key,
            value: value,
        });
    },
}

export default MessageModifyAction;
