var cat = document.getElementById('cat-image');
var result = document.getElementById('number-of-clicks');
cat.addEventListener('click', function(){
  var value = parseInt(result.textContent);
  result.textContent = value + 1;
}, false);
