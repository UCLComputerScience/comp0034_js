/* Final version of the code including chart and popovers */

// The first line ensure the JavaScript does not execute until the page is loaded (document is ready)
$(function () {

    $("#display-chart").hide(); // Hide the display chart button until the top stories have loaded

    let comments = []; //variable to hold the number of comments for each of the top 10 stories

    // Defaults for the popovers see https://getbootstrap.com/docs/4.1/components/popovers/
    $("#top_stories").popover({
        title: "Story details",
        trigger: "hover",
        placement: "right",
        container: 'li',
        html: true,
        selector: '[data-toggle="popover"]'
    });

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
                        //$("#top_stories").append($('<li><a href="' + json['url'] + '">' + json['title'] + '</a></li>'));

                        // Get the date for each story (converted from Unix time)
                        let date = new Date(json['time'] * 1000);
                        let formatDate =  date.getDay()+'-'+date.getMonth()+'-'+date.getFullYear();

                        // add data-toggle and data-content for each story
                        $("#top_stories").append($(
                            '<li><a href="' + json['url'] + '" data-toggle="popover" data-content="<p>Author: ' + json['by'] + '</p><p>Date published: ' + formatDate + '</p>">' + json['title'] + '</a></li>'));

                        // Get the number of comments for each story (data used for the chart)
                        if (json['kids'] === undefined || json['kids'].length === 0) {
                            comments.push(0);
                        } else {
                            comments.push(json['kids'].length);
                        }
                    },
                })
                    .fail(function (jqXhr) {
                        alert("An error occurred: " + jqXhr.status + " " + jqXhr.statusText);
                    });
                return key < 9; //Iterates the item_ids for the first 10 items only
            });
            $("#display-chart").show();
        }
    })
        .fail(function (jqXHR) {
            alert("An error occurred: " + jqXHR.status + " " + jqXHR.statusText);
        });

    /*
    Display a bar chart of the number of comments per story
    Uses the chart.js library https://www.chartjs.org/docs/latest/
    */
    $("#display-chart").click(function () {

        // Create the labels for the xaxis
        let labels = [];
        for (let i = 1; i < comments.length + 1; i++) {
            labels.push(i);
        }
        console.log(labels);

        ctx = $("#bar-chart");

        new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: labels,
                datasets: [{
                    label: "Number of comments",
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    data: comments
                }]
            },
            options: {
                legend: {display: false},
                title: {
                    display: true,
                    text: 'Number of comments per story'
                }
            }
        });
        $("#display-chart").hide();
    });

});