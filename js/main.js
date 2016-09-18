var HTMLcat = '<p>%name%</p><p>Number of clicks:</p><p id="clicks-%name%" class="clicks">0</p></div><img class="cat-image" src="img/cat_%name%.jpg" alt="lovely kitten %name% is looking at you">'


var cats = document.getElementById('cats');
var cat;

cat = document.createElement('div');
cat.innerHTML = HTMLcat.replace(/%name%/g, 'Alice');
cats.appendChild(cat);

cat = document.createElement('div');
cat.innerHTML = HTMLcat.replace(/%name%/g, 'Bob');
cats.appendChild(cat);

var catImages = document.getElementsByClassName('cat-image');
for (catImage of catImages) {
  catImage.addEventListener('click', function(){
    var name = this.parentNode.firstChild.textContent;
    var clicks = document.getElementById('clicks-%name%'.replace('%name%', name));
    var value = parseInt(clicks.textContent);
    clicks.textContent = value + 1;
  }, false);
}
