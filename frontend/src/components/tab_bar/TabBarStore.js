var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var TabBarStore = assign({}, EventEmitter.prototype,{
    items : null,

    getItems: function(){
        return this.items;
    },

    init: function(functionList){
        //alert("init");
        //console.log(functionList);
        this.items = functionList;
    },

    onFunctionButtonClick: function(e) {
        //alert("store");
        var localhref = "http://localhost:3000"
        if(window.location.href !== localhref + e.key){
            window.location.href = localhref + e.key;
        }
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
});

module.exports = TabBarStore;

