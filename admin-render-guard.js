// Stop the legacy app.js renderer on all dedicated admin routes.
// Page-specific admin scripts render the actual interface.
const adminRoute=document.body?.dataset?.page||'';
if(adminRoute==='admin' || adminRoute.startsWith('admin-')){
  window.render=()=>{};
}
