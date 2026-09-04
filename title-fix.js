(function(){
  const LOGO='assets/fablab-logo-header.svg.png';
  function fixBranding(){
    document.title='فاب لاب';
    document.querySelectorAll('link[rel="icon"],link[rel="shortcut icon"],link[rel="apple-touch-icon"],link[rel="apple-touch-icon-precomposed"]').forEach(function(link){
      link.href=LOGO;
      link.type='image/png';
    });
    if(!document.querySelector('link[rel="icon"]')){
      const link=document.createElement('link');
      link.rel='icon'; link.type='image/png'; link.href=LOGO;
      document.head.appendChild(link);
    }
    if(!document.querySelector('link[rel="apple-touch-icon"]')){
      const link=document.createElement('link');
      link.rel='apple-touch-icon'; link.sizes='180x180'; link.href=LOGO;
      document.head.appendChild(link);
    }
  }
  fixBranding();
  new MutationObserver(fixBranding).observe(document.head,{subtree:true,childList:true,characterData:true});
})();