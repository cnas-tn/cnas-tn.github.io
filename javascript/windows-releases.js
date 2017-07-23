// Called from changelog.jsonp
function JsonParse(data) {
  $(function() {
    buildReleaseNotesFromData(data);
  })
}

$.ajax({
  url: '//github-windows.s3.amazonaws.com/changelog.jsonp',
  dataType: 'jsonp'
})

function buildReleaseNotesFromData(data) {
  var releases = $.map(data.releases, createRelease);

  $("#release-notes").empty().append(releases);
}

function getFriendlyDate(changelogDate) {
  if(!changelogDate) {
    return "";
  }

  var parsed = moment(changelogDate, 'YYYY/MM/DD');
  
  if (!parsed.isValid()) {
    return changelogDate;
  }

  return parsed.format('MMMM Do YYYY');
}

function createRelease(r) {
  return $("<section class='release-note position-relative container-new py-6 px-3 text-left' />")
      .append($("<header class='timeline-decorator d-flex flex-items-center mb-3' />")
        .append($("<span class='version-badge d-inline-block bg-purple p-1 rounded-1 mr-2 text-bold' />")
          .text('v' + r.version))
        .append($("<h2 class='f3-light css-truncate css-truncate-target' />")
          .text((r.name ? r.name : r.description) + ' - ' + getFriendlyDate(r.date))))
      .append($("<ul class='list-style-none change-log' />")
      .append($.map(r.changes, createChange)));
}

function createChange(changeText) {
  var m = changeText.match(/^(new|fixed|improved|removed|added|updated)\s*:\s*(.*)/i);

  if (m) {
    return $("<li class='d-flex flex-items-start mb-2'/>")
      .append($("<div class='change-badge' />")
        .addClass('change-badge-' + m[1].toLowerCase())
        .text(m[1]))
      .append($("<div class='change-description' />")
        .text(m[2]));
  }

  return $("<li class='d-flex flex-items-start mb-2'/>")
    .text(changeText);
}
