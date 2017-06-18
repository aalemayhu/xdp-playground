var Page = function() {

};

Page.storage_key = "page_id";

/**
 * Store the current page.
 * @param t
 * @constructor
 */
Page.Set = function(t) {
    try {
        localStorage.setItem(Page.storage_key, t);
    } catch (error) {
        console.log(error+"\nMaybe you are in a special mode?");
    }
};

/**
 * Retrieve the current page.
 * @return {number}
 */
Page.Current = function() {
    try {
        var number = localStorage.getItem(Page.storage_key);
        if (!number) {
            // If the user is here for the "first" time show them the intro.
            return 'intro';
        }
        return number;
    } catch (error) {
        console.log(error+"\nMaybe you are in a special mode?");
    }

    return 0;
};
