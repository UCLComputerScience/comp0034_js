/* This version creates the top 10 stories list */


// The first line ensure the JavaScript does not execute until the page is loaded (document is ready)
$(function () {

    /* Generates a top 10 list of hacker news story items with the story title hyperlinked to the story and collects
    the number of comments per story story.
    Uses the jQuery AJAX function to retrieve json results from the Hacker News API */

    $.ajax('https://hacker-news.firebaseio.com/v0/topstories.json', {
        type: 'GET', // HTTP method (GET is the default if the type is not specified)
        dataType: "json", // type of data to be returned from the URL
        success: function (json) { // function to carry out if a response is received
            $.each(json, function (key, value) { //JQuery syntax for a JavaScript for loop
                $.ajax('https://hacker-news.firebaseio.com/v0/item/' + value + '.json', {
                    dataType: "json",
                    type: 'GET',
                    success: function (json) {

                        //Locate the div with id of top_stories and then append an <a> tag to it for each story
                        $("#top_stories").append($('<li><a href="' + json['url'] + '">' + json['title'] + '</a></li>'));

                    }
                })
                    .fail(function (jqXhr) {
                        alert("An error occurred: " + jqXhr.status + " " + jqXhr.statusText);
                    });
                return key < 9; //Iterates the item_ids for the first 10 items only
            });
        }
    })
        .fail(function (jqXHR) {
            alert("An error occurred: " + jqXHR.status + " " + jqXHR.statusText);
        });
});