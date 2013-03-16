(function () {
    var template = '<tr><td><a href="{{url}}">{{ number }}</a></td><td>{{title}}</td><td>{{ #pull_request.html_url }}<a href="{{ pull_request.html_url }}">Pull Request</a>{{ /pull_request.html_url }}</td><td>{{ updated_at }}</td></tr>';
    var tbl = $('#issues');
    $.getJSON('https://api.github.com/repos/okfn/ckan/issues?assignee=none&sort=updated&direction=asc&callback=?', function(resp) {
        $.each(resp['data'], function(index, row) {
            $(Mustache.render(template, row)).appendTo(tbl);
        });
    });

}());
