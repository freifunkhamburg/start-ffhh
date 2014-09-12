var rss = [
    'hamburg.freifunk.net',
];
var MAX_RSS = 5;

$(document).ready(function() {
    var addItem = function(title, link, date) {
        var item = $('<a>')
            .attr('class', 'css-truncate')
            .attr('href', link)
            .attr('target', '_blank')
            .data('date', date)
            .text(title);
        $('#news').append($('<li>').append(item));
    };

    var getAddedItems = function() {
        var news = [];
        $('#news').find('a').forEach(function(item) {
            var a = $(item);
            var title = a.text();
            var link = a.attr('href');
            var date = a.data('date');

            news.push({title:title, link:link, date:date});
        });
        return news;
    };

    var clearNewsFeed = function() {
        $('#news').children().forEach(function(child) {
            child.remove();
        });
    };

    var updateNewsFeed = function(news) {
        var items = getAddedItems().concat(news);;

        items.sort(function(a, b) {
            a = new Date(a.date);
            b = new Date(b.date);

            return a > b ? -1 : a < b ? 1 : 0;
        });

        clearNewsFeed();

        var i = 0;
        items.forEach(function(item) {
            if(i++ >= MAX_RSS) return;
            addItem(item.title, item.link, item.date);
        });
    };

    rss.forEach(function(feed) {
        $.get('/feeds/' + feed + '.rss', function(data) {
            var news = [];

            $(data).find('item').forEach(function(entry) {
                var title = $(entry).find('title').text();
                var link = $(entry).find('link').text();
                var date = $(entry).find('pubDate').text();

                news.push({title:title, link:link, date:date});
            });

            $(data).find('entry').forEach(function(entry) {
                var title = $(entry).find('title').text();
                var link = $(entry).find('link').attr('href');
                var date = $(entry).find('published').text();

                news.push({title:title, link:link, date:date});
            });

            updateNewsFeed(news);
        });
    });
});
