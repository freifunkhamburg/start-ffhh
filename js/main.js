var rss = [
    'hamburg.freifunk.net'
];
var MAX_RSS = 5;

$(document).ready(function() {
    var i = 0;

    var addItem = function(title, link) {
        if(i >= MAX_RSS) return;

        var item = $('<a>')
            .attr('class', 'css-truncate')
            .attr('href', link)
            .attr('target', '_blank')
            .text(title);
        $('#news').append($('<li>').append(item));

        i++;
    };

    rss.forEach(function(feed) {
        $.get('/feeds/' + feed + '.rss', function(data) {
            $(data).find('item').forEach(function(entry) {
                var title = $(entry).find('title').text();
                var link = $(entry).find('link').text();

                addItem(title, link);
            });

            $(data).find('entry').forEach(function(entry) {
                var title = $(entry).find('title').text();
                var link = $(entry).find('link').attr('href');

                addItem(title, link);
            });
        });
    });
});
