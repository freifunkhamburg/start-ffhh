var rss = [
    'hamburg.freifunk.net'
];

$(document).ready(function() {
    rss.forEach(function(feed) {
        $.get('/feeds/' + feed + '.rss', function(data) {
            $(data).find('item').forEach(function(entry) {
                var title = $(entry).find('title').text();
                var link = $(entry).find('link').text();

                var item = $('<a>')
                    .attr('href', link)
                    .attr('target', '_blank')
                    .text(title);
                $('#news').append($('<li>').append(item));
            });
        });
    });
});
