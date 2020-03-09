$(document).ready(function () {
    $('body').popover({
        title: "Story details",
        trigger: "hover",
        placement: "right",
        container: 'body',
        html: true,
        selector: '[data-toggle="popover"]',
    });
    let comments = [];
    $.ajax({
        url: 'https://hacker-news.firebaseio.com/v0/topstories.json', // Hacker News API
        type: 'GET',
        dataType: 'json',
        success: function (json) { // function to carry out if a response is received
            // 'json' contains the top story IDs from Hacker News returned by the first AJAX call
            $.each(json, function (key, value) { //JQuery syntax for a JavaScript for loop
                $.ajax({
                    url: 'https://hacker-news.firebaseio.com/v0/item/' + value + '.json', // Hacker News API for a single item
                    type: 'GET',
                    dataType: 'json', success: function (json) {
                        //locate the div with id of top_stories and then append an a tag to it for each story
                        //$("#top_stories").append($('<li><a href="' + json['url'] + '">' + json['title'] + '</a></li>'));
                        // add data-toggle and data-content for each story
                        $("#top_stories").append($('<li><a href="' + json['url'] + '" data-toggle="popover" data-content="<p>Author: ' + json['by'] + '</p>">' + json['title'] + '</a></li>'));
                        if (json['kids'] === undefined || json['kids'].length === 0) {
                            comments.push(0);
                        } else {
                            comments.push(json['kids'].length);
                        }
                    },
                    error: function (xhr) {
                        alert("An error occurred: " + xhr.status + " " + xhr.statusText);
                    }
                });
                return key < 9; //Iterates the item_ids for the first 10 items only
            });
        }, error: function (xhr) {
            alert("An error occurred: " + xhr.status + " " + xhr.statusText);
        }
    });

    $("#display-chart").click(function () {
        ctx = document.getElementById('bar-chart');
        new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], //TODO: dynamically generate labels
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