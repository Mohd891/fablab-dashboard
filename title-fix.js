(function(){
  document.title='فاب لاب';
  const logo='assets/fablab-logo-header.svg.png';
  document.querySelectorAll('link[rel="icon"],link[rel="shortcut icon"],link[rel="apple-touch-icon"],link[rel="apple-touch-icon-precomposed"]').forEach(function(link){
    link.href=logo;
    link.type='image/png';
  });
})();