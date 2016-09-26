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
    getCurrentCat: function() {
      return currentCat;
    },
    updateCurrentCat: function(name, imageURL, clicks) {
      currentCat.name = name;
      currentCat.imageURL = imageURL;
      currentCat.clicks = clicks;
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

  // side bar
  var navigation = $('#navigation');

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

  // card view
  var card = $('.cat-clicker-card-image.mdl-card');
  var drawer = $('#drawer');
  var data = $('#data');

  var main = {
    init: function() {
      octopus.setCurrentCat(octopus.getCat(0));
      card.click(function() {
          octopus.clickCurrentCat();
      });
    },
    render: function(cat) {
      // TODO: if name is updated but not clicks, the position of badge may be incorrect
      // i.e. the badge is on top of the middle of the name.
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

  // admin dialog
  var dialog = document.querySelector('dialog');
  var showDialogButton = document.querySelector('#show-dialog');
  var nameInputField = document.querySelector('#name-input');
  var urlInputField = document.querySelector('#url-input');
  var clicksInputField = document.querySelector('#clicks-input');


  if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }
  showDialogButton.addEventListener('click', function() {
    var currentCat = octopus.getCurrentCat();
    nameInputField.parentNode.MaterialTextfield.change(currentCat.name);
    urlInputField.parentNode.MaterialTextfield.change(currentCat.imageURL);
    clicksInputField.parentNode.MaterialTextfield.change(currentCat.clicks.toString());
    dialog.showModal();
  });
  dialog.querySelector('.discard').addEventListener('click', function() {
    dialog.close();
  });
  dialog.querySelector('.save').addEventListener('click', function() {
    octopus.updateCurrentCat(nameInputField.value, urlInputField.value, clicksInputField.value);
    octopus.showCurrentCat();
    dialog.close();
  });

  octopus.init();
});
