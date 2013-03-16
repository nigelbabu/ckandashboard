(function () {
    var tbl = $('#issues');
    $.getJSON('https://api.github.com/repos/okfn/ckan/issues?assignee=none&sort=updated&callback=?', function(resp) {
        $.each(resp['data'], function(index, row) {
            console.log(row);
            $('<tr><td colspan="4">' + row['number'] + '</td></tr>').appendTo(tbl);
        });
    });

}());
