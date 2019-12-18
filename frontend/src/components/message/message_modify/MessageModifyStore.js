import MessageFetch from "../../../public_service/message/MessageFetch";
import { message } from 'antd';
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
/*
"message:"
*/
var MessageModifyStore = assign({}, EventEmitter.prototype, {
    items: {
        messageInfo: null,
        deliveryInfo: null,
        messageItems: null,
        messageInfoModifyAccess: null,
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
        console.log(initInfo);

        this.getMessageInfo();
    },

    getMessageInfo: function () {
        var t = this;
        console.log(this.record.initInfo)
        var response = MessageFetch.fetchGetMessageInfo(this.record.initInfo.consumerId);
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
                    data.messages.sort((a,b) => {
                        return a.time - b.time;
                    })
                    t.items.messages = data.messages.map((item) => {
                        item.time = t.stringTime(item.time);
                        return item;
                    });
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

    /*change items key:messageItems-2*/
    handleChange: function (key, value) {

        switch (key) {
            case "content":
                console.log(value)
                this.items.value = value;
                break;
            case "tab":
                var t = this;
                var response = MessageFetch.fetchComfirmMessage(this.record.initInfo.consumerId);
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
                        console.log(data);
                        if (data.success) {
                            t.getMessageInfo();
                        }
                        else {
                            console.log(data.errmsg);
                        }
                    }
                ).catch(function (err) {
                    console.log(err);
                });
                break;
            case "send":
                var date = new Date();
                var YY = date.getFullYear() + '-';
                var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
                var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                this.items.messages.push({
                    resource: false,
                    content: value,
                    status: false,
                    time: YY + MM + DD + " " + hh + mm + ss,
                });
                this.items.messages[1].status = true;
                var t = this;
                var response = MessageFetch.fetchSendMessage({
                    consumerId: this.record.initInfo.consumerId,
                    content: value,
                });
                this.items.value = "";
                console.log(this.record.initInfo.consumerId + value);
                console.log(response);
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
                        console.log(data)
                        if (data.success) {
                            t.getMessageInfo();
                        }
                        else {
                            console.log(data.errmsg);
                        }
                    }
                ).catch(function (err) {
                    console.log(err);
                });
                break;
            case "flush":
                alert("???");
                this.getMessageInfo();
                break;
            default:
                break;
        }
        this.emitChange();
    },

    stringTime: function (time) {
        var date = new Date(time);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD + " " + hh + mm + ss;
    }
});

export default MessageModifyStore;

