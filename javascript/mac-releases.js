(function() {

	$(function() {
		var el = $('#release-notes');
		el.html('<h2>Loading…</h2>')
	})

	var success = function(data) {
		$(function() { buildReleases(data); } )
	}

	var error = function(data) {
		$(function() { el.html$('<h2>Somethign happened while fetching release notes...</h2>'); })
	}

	$.ajax({
		url: 'https://central.github.com/mac/appcast.json',
		dataType: 'jsonp',
		success: success,
		error: error
	})

})();

function buildReleases(data) {
	var releases = $.map(data.releases, createRelease);

  $("#release-notes").empty().append(releases);
}

function createRelease(r) {
	changes = r.description.split('•')
  return $("<section class='release-note position-relative container-new py-6 px-3 text-left' />")
      .append($("<header class='timeline-decorator d-flex flex-items-center mb-3' />")
        .append($("<span class='version-badge d-inline-block bg-purple p-1 rounded-1 mr-2 text-bold' />")
          .text('v' + r.version))
        .append($("<h2 class='f3-light css-truncate css-truncate-target' />")
          .text(r.title + ' - ' + (r.date ? moment(r.date).format('MMMM Do YYYY') : ""))))
      .append($("<ul class='list-style-none change-log' />")
      .append($.map(changes, createChange)));
}

function createChange(changeText) {
	if (changeText != '') {
	  var m = $.trim(changeText).match(/^\[(new|fixed|improved|removed|added)\]\s(.*)/i);
		if (m) {
	    return $("<li class='d-flex flex-items-start mb-2'/>")
	      .append($("<div class='change-badge' />")
	        .addClass('change-badge' + m[1].toLowerCase())
					.text(m[1]))
				.append($("<div class='change-description' />")
		      .append(document.createTextNode(m[2])));
	  }

	  return $("<li class='d-flex flex-items-start mb-2'/>").text(changeText);
	}
}
