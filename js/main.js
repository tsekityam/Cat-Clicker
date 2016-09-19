var HTMLCatNavigationLink = '<a class="mdl-navigation__link">🐱 %name%</a>';
var HTMLCatBadge = '<span class="cat-clicker-card-image__clicks mdl-badge" data-badge="4">Inbox</span>';

var Cat = function (name, imageURL) {
  this.name = name;
  this.imageURL = imageURL;
  this.clicks = 0;
};

var cats = [
  new Cat('300', 'https://placekitten.com/g/300/300'),
  new Cat('301', 'https://placekitten.com/g/301/301'),
  new Cat('302', 'https://placekitten.com/g/302/302'),
  new Cat('303', 'https://placekitten.com/g/303/303'),
  new Cat('304', 'https://placekitten.com/g/304/304')];

var index = 0;
var navigation = $('#navigation');
for (cat of cats) {
  navigation.append(HTMLCatNavigationLink.replace('%name%', cat.name));
  navigation.children().last().click((function(copyCat) {
    return function() {
      updateCard(copyCat);
    };
  })(cat));
  index++;
}

var card = $('.cat-clicker-card-image.mdl-card');
var drawer = $('#drawer');
var data = $('#data');
function updateCard(cat) {
  card.css('background', 'url(\'' + cat.imageURL + '\') center / cover');
  card.off('click');
  card.click((function(copyCat) {
    return function() {
      updateClicks(copyCat);
    };
  })(cat));
  data.text(cat.name);
  data.attr("data-badge", cat.clicks);
  drawer.toggleClass('is-visible');
  $('.mdl-layout__obfuscator').toggleClass('is-visible');
}

function updateClicks(cat) {
  cat.clicks++;
  data.attr("data-badge", cat.clicks);
}
