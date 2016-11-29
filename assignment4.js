(function() {
  var link = 'http://www.google.com/search?q=';

  $('.flexsearch-submit').click(function() {
    var input = $('.flexsearch-input').val();
    window.open(link.concat(input), '_blank');
  });

  var searchList = [];

  function findMatches(input) {
    var match = 0;
    $.each(searchList, function(index, value) {
      if(value.startsWith(input)) {
        var search = value.split(' ').join('+');
        $('.predictive-search-matches').append('<li><a target=_blank \
        href=' + link.concat(search) + '>' + value + '</a></li>');
        match++;
      }
    });
    if (!match) {
      $('.predictive-search-matches').hide();
    }
  }

  $('.flexsearch-input').keyup(function() {
    $('.predictive-search-matches').empty();
    var input = $('.flexsearch-input').val().toLowerCase();
    if(input.length > 0) {
      $('.predictive-search-matches').fadeIn(800);
      findMatches(input);
    }
    else {
      $('.predictive-search-matches').hide();
    }
  });

  $.getJSON('http://www.mattbowytz.com/simple_api.json?data=all', function(data) {
    $.each(data.data, function(obj, group) {
      $.each(group, function(index, value) {
        searchList.push(value.toLowerCase());
      });
    });
  });

  $.getJSON('http://www.mattbowytz.com/simple_api.json?data=comics', function(data) {
    $.each(data.data, function(index,value) {
      searchList.push(value.toLowerCase());
    });
  });

  $('.predictive-search-matches').hide();
})();
