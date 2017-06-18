var User = function() {

};

User.storage_key = "user_input";

User.SaveInput = function(t) {
    localStorage.setItem(User.storage_key, t);
};

User.Input = function() {
    return localStorage.getItem(User.storage_key);
};