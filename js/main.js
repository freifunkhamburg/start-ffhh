var rss = [
    'hamburg.freifunk.net'
];

$(document).ready(function() {
    rss.forEach(function(feed) {
        $.get('/feeds/' + feed + '.rss', function(data) {
            $(data).find('.entry').forEach(function(entry) {
                var a = $(entry).find('a');
                var title = a.text();
                var link = a.attr('href');
                var text = $(entry).children('.feedEntryContent').text();

                var item = $('<a>')
                    .attr('href', link)
                    .attr('target', '_blank')
                    .text(title);
                $('#news').append($('<li>').append(item));
            });
        });
    });
});
