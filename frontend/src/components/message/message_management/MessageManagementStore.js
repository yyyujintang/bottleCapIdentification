var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var MessageManagementStore = assign({}, EventEmitter.prototype,{
    items : {
        showState: null,
        selectedMessageId: null,
        userId: null,
        userRole: null,
    },

    record : {
        initInfo : null,
    },

    getItems: function(){
        return this.items;
    },

    emitChange: function () {
        //alert("change");
        this.emit("change");
    },
    
    addChangeListener: function(callback) {
        this.on("change", callback);
    },
    
    removeChangeListener: function(callback) {
        this.removeListener("change", callback);
    },

    init: function(initInfo){
        this.record.initInfo = initInfo;
        this.items.showState = "list";
        
    },

    toMessageModify(consumerId){
        console.log(consumerId);
        this.items.selectedConsumerId = consumerId;
        this.items.showState = "modify";
    },

    toMessageList(){
        this.items.selectedMessageId = null;
        this.items.showState = "list";
    },
});

module.exports = MessageManagementStore;

