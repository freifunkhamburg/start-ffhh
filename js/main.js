var rss = [
    'hamburg.freifunk.net'
];
var MAX_RSS = 5;

$(document).ready(function() {
    var i = 0;
    rss.forEach(function(feed) {
        $.get('/feeds/' + feed + '.rss', function(data) {
            $(data).find('item').forEach(function(entry) {
                if(i >= MAX_RSS) return;
                var title = $(entry).find('title').text();
                var link = $(entry).find('link').text();

                var item = $('<a>')
                    .attr('class', 'css-truncate')
                    .attr('href', link)
                    .attr('target', '_blank')
                    .text(title);
                $('#news').append($('<li>').append(item));
                i++;
            });

            $(data).find('entry').forEach(function(entry) {
                if(i >= MAX_RSS) return;
                var title = $(entry).find('title').text();
                var link = $(entry).find('link').attr('href');

                var item = $('<a>')
                    .attr('class', 'css-truncate')
                    .attr('href', link)
                    .attr('target', '_blank')
                    .text(title);
                $('#news').append($('<li>').append(item));
                i++;
            });
        });
    });
});
