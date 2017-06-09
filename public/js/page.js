var Page = function() {

};

Page.storage_key = "page_id";

Page.Set = function(t) {
    localStorage.setItem(Page.storage_key, t);
};

Page.Current = function() {
    var number = localStorage.getItem(Page.storage_key);
    if (!number) {
        // If the user is here for the "first" time show them the intro.
        return 'intro';
    }
    return number;
};