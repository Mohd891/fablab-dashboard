// Prevent the legacy app.js renderer from briefly drawing the old admin page.
// The dedicated admin page script owns rendering for this route.
if(document.body?.dataset.page==='admin'){
  window.render=()=>{};
}
