var User = function() {

};

User.storage_key = "user_input";

User.SaveInput = function(t) {
    try {
        localStorage.setItem(User.storage_key, t);
    } catch (error) {
        console.log(error+"\nMaybe you are in a special mode?");
    }
};

User.Input = function() {
    try {
        return localStorage.getItem(User.storage_key);
    } catch (error) {
        console.log(error+"\nMaybe you are in a special mode?");
    }

    return "";
};