(function(){
  const css=`
  .ab-wrap{background:#fff;border:1px solid #e3e9f1;border-radius:22px;padding:22px;box-shadow:0 12px 32px rgba(20,32,50,.06)}
  .ab-head{display:flex;align-items:flex-end;justify-content:space-between;gap:15px;margin-bottom:18px}.ab-head h2{margin:0;font-size:28px}.ab-head p{margin:6px 0 0;color:#718096}
  .ab-table{width:100%;border-collapse:separate;border-spacing:0}.ab-table th{background:#f5f7fa;color:#334155;font-size:14px;font-weight:800;padding:14px 12px;text-align:right;border-bottom:1px solid #e3e9f1;white-space:nowrap}.ab-table td{padding:15px 12px;border-bottom:1px solid #edf1f5;vertical-align:middle;color:#17233b}.ab-table tr:last-child td{border-bottom:0}.ab-table tbody tr:hover{background:#fbfcfe}
  .ab-num{display:inline-flex;min-width:38px;height:32px;align-items:center;justify-content:center;border-radius:9px;background:#eef4ff;color:#2867d8;font-weight:900}.ab-student{font-weight:800}.ab-phone{display:block;color:#718096;font-size:12px;margin-top:4px;direction:ltr;text-align:right}.ab-date{font-weight:700;white-space:nowrap}.ab-time{font-weight:700;white-space:nowrap;direction:ltr;text-align:right}.ab-status{display:inline-flex;padding:7px 10px;border-radius:999px;font-size:12px;font-weight:800;white-space:nowrap}.ab-pending{background:#fff6dc;color:#946200}.ab-approved{background:#e9f8ef;color:#197044}.ab-rejected{background:#fdecec;color:#a62b2b}.ab-actions{display:flex;gap:7px;flex-wrap:wrap}.ab-actions button{border:0;border-radius:9px;padding:8px 12px;font:inherit;font-weight:700;cursor:pointer}.ab-actions button:first-child{background:#2867d8;color:#fff}.ab-actions button:last-child{background:#f1f3f6;color:#25344d}
  @media(max-width:800px){.ab-wrap{padding:14px}.ab-head{align-items:flex-start;flex-direction:column}.ab-scroll{overflow-x:auto}.ab-table{min-width:850px}.ab-table th,.ab-table td{padding:11px 9px}}
  `;
  function addCss(){if(document.getElementById('abBookingsCss'))return;const s=document.createElement('style');s.id='abBookingsCss';s.textContent=css;document.head.appendChild(s)}
  function status(v){if(v==='approved')return '<span class="ab-status ab-approved">تمت الموافقة</span>';if(v==='rejected')return '<span class="ab-status ab-rejected">تم الرفض</span>';return '<span class="ab-status ab-pending">بانتظار المراجعة</span>'}
  function enhance(){
    const host=document.querySelector('#afBookings');
    if(!host||host.dataset.enhanced==='1')return;
    const table=host.querySelector('table'),body=table?.querySelector('tbody'),head=table?.querySelector('thead tr');
    if(!table||!body||!head)return;
    const rows=[...body.querySelectorAll('tr')];
    rows.forEach((tr,i)=>{
      const n=document.createElement('td');n.innerHTML='<span class="ab-num">'+(i+1)+'</span>';tr.insertBefore(n,tr.firstElementChild);
      const cells=tr.querySelectorAll('td');
      // columns after adding number: number, student, department, date, time, status, action
      cells[1]?.classList.add('ab-student');
      cells[3]?.classList.add('ab-date');
      cells[4]?.classList.add('ab-time');
      if(cells[5]){const raw=cells[5].textContent.trim();cells[5].innerHTML=raw==='تمت الموافقة'?status('approved'):raw==='تم الرفض'?status('rejected'):status('pending')}
      cells[6]?.classList.add('ab-actions');
    });
    const th=document.createElement('th');th.textContent='رقم الطلب';head.insertBefore(th,head.firstElementChild);
    table.classList.add('ab-table');
    const wrap=document.createElement('div');wrap.className='ab-wrap';wrap.innerHTML='<div class="ab-head"><div><h2>الحجوزات والمواعيد</h2><p>جميع طلبات حجز المواعيد مرتبة حسب التاريخ والوقت.</p></div></div><div class="ab-scroll"></div>';
    wrap.querySelector('.ab-scroll').appendChild(table);host.innerHTML='';host.appendChild(wrap);host.dataset.enhanced='1';
  }
  addCss();
  const obs=new MutationObserver(()=>setTimeout(enhance,0));obs.observe(document.body,{childList:true,subtree:true});
  setTimeout(enhance,100);
})();