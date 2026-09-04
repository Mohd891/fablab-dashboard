document.title='فاب لاب';
new MutationObserver(()=>{if(document.title!=='فاب لاب')document.title='فاب لاب'}).observe(document.head,{subtree:true,childList:true,characterData:true});