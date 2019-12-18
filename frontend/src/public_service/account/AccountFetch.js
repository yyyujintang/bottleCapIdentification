

var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

const serverUrl = "http://202.120.40.8:30495";

const homeUrl = "http://localhost:3000";

const postHeader = new Headers({
    "Content-Type": "application/json",
});

const getHeader = new Headers({
    "Access-Control-Allow-Origin":"*",
    "Content-Type":"text/plain",
    "Authorization" : "BasicCustom"
});
var AccountFetch = assign({}, EventEmitter.prototype,{

    getHomeUrl: function(){
        return homeUrl;
    },

    changeuserRoletouser_role: function(userRole){
        var changeTable = {
            "superAdmin": "super_admin",
            "dealerAdmin": "dealer_admin",
            "consumerAdmin": "consumer_admin",
            "customerService": "customer_service",
            "dealer": "dealer",
            "consumer": "consumer",
        }
        return changeTable[userRole];
    },

    fetchLogin: function(username, password, usertype){
        var url = serverUrl + "/account/login";
        var params = {
            username: username + "&" + usertype,
            password: password,
        }
        var fetchBody = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
        }).join("&");

        var response = fetch(url,{
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded",
            }),
            credentials: "include",
            mode: "cors",
            body: fetchBody,
        });
        return response;
    },

    fetchGetSelfUserInfo: function(userRole){
        var url = serverUrl + "/account/" + this.changeuserRoletouser_role(userRole) + "/info";
        var response = fetch(url,{
            method: "GET",
            headers: getHeader,
            credentials: "include",
            mode: "cors",
        });
        return response;
    },

    fetchModifySelfUserInfo: function(user){
        var url = serverUrl + "/account/" + this.changeuserRoletouser_role(user.userRole) + "/info";
        var fetchBody = {
            user: user,
        };
        var response = fetch(url,{
            method: "POST",
            headers: postHeader,
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(fetchBody),
            }
        );
        return response;
    },

    fetchModifySelfPassword: function(userRole, oldPassword, newPassword){
        var url = serverUrl + "/account/" + this.changeuserRoletouser_role(userRole) + "/password";
        var fetchBody = {
            password: {
                oldPassword: oldPassword,
                newPassword: newPassword,
            }
        }
        console.log(fetchBody);
        var response = fetch(url,{
            method: "POST",
            headers: postHeader,
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(fetchBody),
        });
        return response;
    },

    fetchGetSubordinateUserList: function(userRoleMaster, userRoleSubordinate){
        var url = serverUrl + "/account/" + this.changeuserRoletouser_role(userRoleMaster) + "/get/" + this.changeuserRoletouser_role(userRoleSubordinate) + "/list";
        
        var response = fetch(url,{
            method: "GET",
            headers: getHeader,
            credentials: "include",
            mode: "cors",
        });
        return response;
    },

    fetchGetSubordinateUserInfo: function(userRoleMaster, userRoleSubordinate, userId){
        var url = serverUrl + "/account/" + this.changeuserRoletouser_role(userRoleMaster) + "/get/" + this.changeuserRoletouser_role(userRoleSubordinate) + "/info?id=" + userId;
        console.log(url);
        var response = fetch(url,{
            method: "GET",
            headers: getHeader,
            credentials: "include",
            mode: "cors",
        });
        return response;
    },

    fetchModifySubordinateUserInfo: function(userRoleMaster, userRoleSubordinate, user){
        var url = serverUrl + "/account/" + this.changeuserRoletouser_role(userRoleMaster) + "/modify/" + this.changeuserRoletouser_role(userRoleSubordinate) + "/info";
        var fetchBody = {
            user: user,
        };
        console.log(fetchBody);
        console.log(url)
        var response = fetch(url,{
            method: "POST",
            headers: postHeader,
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(fetchBody),
        });
        return response;
    },

    fetchAddSubordinateUserInfo: function(userRoleMaster, userRoleSubordinate, user){
        var url = serverUrl + "/account/" + this.changeuserRoletouser_role(userRoleMaster) + "/add/" + this.changeuserRoletouser_role(userRoleSubordinate) + "/info";
        var fetchBody = {
            user: user,
        };
        var response = fetch(url,{
            method: "POST",
            headers: postHeader,
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(fetchBody),
        });
        return response;
    },
});

export default AccountFetch;