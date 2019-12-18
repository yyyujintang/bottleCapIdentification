import MessageFetch from "../../../public_service/message/MessageFetch";
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var MessageListStore = assign({}, EventEmitter.prototype, {
    items: {
        messageList: null,
    },

    record: {
        initInfo: null,
    },

    emitChange: function () {
        this.emit("change");
    },

    addChangeListener: function (callback) {
        this.on("change", callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener("change", callback);
    },

    getItems: function () {
        return this.items;
    },

    init: function (initInfo) {
        this.record.initInfo = initInfo;
        this.getMessageList();
    },

    getMessageList() {
        this.items.messageList = [];
        /*
        {
                key: 1,
                messageId: 1,
                consumerId: 1,
                time: "12:00\n2019/7/23",
                status: "UNPAID",
                totalPrice: 12.21,
            }
        */
        var t = this;
        var response = MessageFetch.fetchGetMessageList();
        response.then(
            function (response) {
                if (response.status !== 200) {
                    console.log("存在一个问题，状态码为：" + response.status);
                    return;
                }
                return response.json();
            }
        ).then(
            function (data) {
                if (data.success) {
                    console.log(data);
                    for (var i = 0; i < data.users.length; i++) {
                        data.users[i]["key"] = i + 1;
                        t.items.messageList.push(data.users[i]);
                    }
                    
                    t.emitChange();
                }
                else {
                    console.log(data.errmsg);
                }
            }
        ).catch(function (err) {
            console.log(err);
        });
    },
});
export default MessageListStore;

