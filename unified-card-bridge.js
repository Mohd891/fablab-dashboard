(()=>{
const txt=e=>(e?.innerText||'').trim();
function studentFromRow(tr){const c=[...tr.children].map(txt);return {id:c[1]||'STU',full_name:c[1],national_id:c[2],phone:c[3],program:c[4],department:c[5],type:'طالب'};}
function personFromRow(tr){const c=[...tr.children].map(txt);const type=c[1]||'موظف';return {id:c[0]||'TEAM',name:c[0],type,department:c[2],programs:type==='متدرب تعاوني'?[]:(c[3]&&c[3]!=='—'?[c[3]]:[]),role:type==='متدرب تعاوني'?c[3]:'',national_id:c[0],email:c[0]};}
function show(x){if(window.FABLAB_UNIFIED_CARD)window.FABLAB_UNIFIED_CARD.show(x);else setTimeout(()=>show(x),100)}
function init(){document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const tr=b.closest('tr');const label=txt(b);if(tr&&label==='بطاقة'){e.preventDefault();e.stopImmediatePropagation();const cells=tr.children.length;show(cells>=8?studentFromRow(tr):personFromRow(tr));return;}if(b.id==='oneCardPrint'&&document.querySelector('.card-box')){e.preventDefault();e.stopImmediatePropagation();return;}if(b.id==='printCards'&&document.body.dataset.page==='admin-students'){e.preventDefault();e.stopImmediatePropagation();const rows=[...document.querySelectorAll('#studentRows input[data-sid]:checked')].map(x=>studentFromRow(x.closest('tr')));if(!rows.length)return alert('حدد طالبًا واحدًا على الأقل.');showBatch(rows)}} ,true)}
function showBatch(rows){if(window.FABLAB_UNIFIED_CARD)window.FABLAB_UNIFIED_CARD.print(rows);else setTimeout(()=>showBatch(rows),100)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();