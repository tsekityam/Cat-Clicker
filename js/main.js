$(function(){

  var HTMLCatNavigationLink = '<a class="mdl-navigation__link">🐱 %name%</a>';
  var HTMLCatBadge = '<span class="cat-clicker-card-image__clicks mdl-badge" data-badge="4">Inbox</span>';

  // model
  var Cat = function (name, imageURL) {
    this.name = name;
    this.imageURL = imageURL;
    this.clicks = 0;
  };

  var cats= [];
  var currentCat;

  // octopus
  var octopus = {
    addCat: function(name, url) {
      var cat = new Cat(name, url);
      cats.push(cat);
    },
    setCurrentCat: function(cat) {
      currentCat = cat;
      this.showCurrentCat();
    },
    getCat: function(index) {
      return cats[index];
    },
    clickCurrentCat: function() {
      currentCat.clicks++;
      this.showCurrentCat();
    },
    showCurrentCat: function() {
      main.render(currentCat);
    },
    init: function() {
      this.addCat('300', 'https://placekitten.com/g/300/300');
      this.addCat('301', 'https://placekitten.com/g/301/301'),
      this.addCat('302', 'https://placekitten.com/g/302/302'),
      this.addCat('303', 'https://placekitten.com/g/303/303'),
      this.addCat('304', 'https://placekitten.com/g/304/304');
      this.addCat('305', 'https://placekitten.com/g/305/305');
      list.render();

      main.init();
    }
  };

  function updateClicks(cat) {
    cat.clicks++;
    data.attr("data-badge", cat.clicks);
  }

  // view
  var navigation = $('#navigation');
  var card = $('.cat-clicker-card-image.mdl-card');
  var drawer = $('#drawer');
  var data = $('#data');

  var list = {
    render: function() {
      navigation.empty();
      for (cat of cats) {
        navigation.append(HTMLCatNavigationLink.replace('%name%', cat.name));
        navigation.children().last().click((function(copyCat) {
          return function() {
            octopus.setCurrentCat(copyCat);
          };
        })(cat));
      }
    }
  }

  var main = {
    init: function() {
      octopus.setCurrentCat(octopus.getCat(0));
      card.click(function() {
          octopus.clickCurrentCat();
      });
    },
    render: function(cat) {
      card.css('background', 'url(\'' + cat.imageURL + '\') center / cover');
      data.text(cat.name);
      data.attr("data-badge", cat.clicks);
      if (drawer.hasClass('is-visible')) {
        drawer.toggleClass('is-visible');
      }
      var obfuscator = $('.mdl-layout__obfuscator');
      if (obfuscator.hasClass('is-visible')) {
        obfuscator.toggleClass('is-visible');
      }
    }
  }

  octopus.init();
});
