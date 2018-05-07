function showBlock() {
  var blocks = document.querySelectorAll('.block');
  for (var i=0, len = blocks.length; i < len; i++) {
    console.log(blocks[i].id);
  }
}

// document.body.onload = showBlock();
