(function(){
  function apply(){
    if(!document.body || !document.body.dataset.page || !document.body.dataset.page.startsWith('admin')) return;
    if(document.getElementById('adminMobileFixStyle')) return;
    const style=document.createElement('style');
    style.id='adminMobileFixStyle';
    style.textContent=`
      @media (max-width:700px){
        body.portal-body{overflow-x:hidden}
        .portal-side{position:relative!important;top:auto!important;right:auto!important;bottom:auto!important;width:100%!important;height:auto!important;min-height:0!important;border-left:0!important;border-bottom:1px solid #e4e9f0!important;padding:10px!important;z-index:100!important;display:block!important}
        .portal-side .brand{display:flex!important;justify-content:center!important;padding:5px 8px 12px!important;border-bottom:1px solid #eef1f4!important}
        .portal-side .brand span{display:inline!important;font-size:13px!important}
        .portal-side nav{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:7px!important;padding-top:10px!important}
        .portal-side .side-link{display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;min-height:44px!important;padding:10px 8px!important;font-size:12px!important;line-height:1.3!important;background:#f7f9fc!important;border:1px solid #e5eaf1!important;color:#657186!important}
        .portal-side .side-link:hover,.portal-side .side-link:active{background:#eef4ff!important;color:#2865df!important}
        .portal-side .side-link.logout{margin-top:0!important;grid-column:1 / -1!important;background:#fff5f5!important;color:#b42318!important;border-color:#f2d4d4!important}
        .portal-main{margin-right:0!important;padding:16px 12px 30px!important;min-height:auto!important}
        .portal-top{gap:10px!important;margin-bottom:16px!important;align-items:center!important}
        .portal-top h1{font-size:23px!important}
        .portal-top p{font-size:11px!important}
        .kpi-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}
        .quick-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}
        .quick{padding:14px 10px!important;text-align:center!important}
        .portal-card{padding:13px!important;border-radius:13px!important}
        .toolbar{flex-wrap:wrap!important}
        .table-wrap{width:100%!important;overflow-x:auto!important;-webkit-overflow-scrolling:touch}
        .portal-card table{min-width:620px}
      }
      @media print{
        @page{size:A4 portrait;margin:12mm}
        html,body{background:#fff!important}
        .portal-side,.portal-top .icon-btn,#adminPrintReportBtn,.ai-chat-launch,.ai-chat-panel{display:none!important}
        .portal-main{margin:0!important;padding:0!important;min-height:0!important;width:100%!important}
        .portal-main > *{max-width:180mm;margin-left:auto!important;margin-right:auto!important}
        .portal-main .kpi-grid{grid-template-columns:repeat(4,1fr)!important;gap:8mm!important}
        .portal-card{box-shadow:none!important;border:1px solid #d9dfe8!important;break-inside:avoid}
        .portal-card table{width:100%!important;font-size:10pt!important}
        .portal-card th,.portal-card td{padding:7px 6px!important}
      }
    `;
    document.head.appendChild(style);
  }
  function addPrintButton(){
    if(document.body.dataset.page!=='admin-reports') return;
    if(document.getElementById('adminPrintReportBtn')) return;
    const top=document.querySelector('.portal-top');
    if(!top) return;
    const btn=document.createElement('button');
    btn.id='adminPrintReportBtn';
    btn.className='btn primary';
    btn.type='button';
    btn.textContent='🖨️ طباعة التقرير';
    btn.addEventListener('click',()=>window.print());
    top.appendChild(btn);
  }
  function boot(){apply();addPrintButton();setTimeout(addPrintButton,250);setTimeout(addPrintButton,700)}
  document.addEventListener('DOMContentLoaded',boot);
  window.addEventListener('load',boot);
  const observer=new MutationObserver(()=>{apply();addPrintButton()});
  observer.observe(document.documentElement,{childList:true,subtree:true});
})();
