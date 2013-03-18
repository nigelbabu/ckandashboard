(function () {
  var html_templ = '<tr><td><a href="{{ html_url }}">{{ number }}</a></td><td>{{title}}</td><td>{{ #pull_request.html_url }}<a href="{{ pull_request.html_url }}">Pull Request</a>{{ /pull_request.html_url }}</td><td>{{ updated_at }}</td></tr>';
  var milestone = get_query_param()['milestone'] || null;
  var url_default = Mustache.render('https://api.github.com/repos/okfn/ckan/issues?assignee=none&sort=updated&{{ #ms }}milestone={{ ms}}&{{ /ms }}direction=asc', {'ms': milestone});
  var url_callb_tmpl = '{{ &url }}&callback=?';
  var tbl = $('#issues');

  function get_query_param() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  }

  function table_add(data) {
    $.each(data, function(index, row) {
      $(Mustache.render(html_templ, row)).appendTo(tbl);
    });
  }

  function get_next_url(meta) {
    var result = null;
    if ('Link' in meta) {
      $.each(meta.Link, function(index, row) {
        if ('next' === row[1]['rel']) {
          result = row[0];
          return false;
        }
      });
    }
    return result;
  }

  function get_request(url) {
    $.getJSON(Mustache.render(url_callb_tmpl, {'url': url}), function(resp) {
      next = get_next_url(resp.meta);
      table_add(resp.data);
      if (next) {
        get_request(next);
      }
    });
  }
  get_request(url_default);

}());
