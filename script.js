const API = "api/";
let programsCache = [];
let studentsCache = [];
let attendanceCache = [];

const $ = (id) => document.getElementById(id);

function showToast(message, type="success") {
  const t = $("toast");
  t.textContent = message;
  t.className = "toast show " + type;
  setTimeout(() => t.className = "toast", 2500);
}

async function api(url, options={}) {
  const response = await fetch(API + url, {
    headers: {"Content-Type": "application/json", ...(options.headers || {})},
    ...options
  });
  const text = await response.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error(text || "استجابة غير صحيحة من الخادم"); }
  if (!response.ok || data.success === false) throw new Error(data.message || "حدث خطأ");
  return data;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("ar-SA", {year:"numeric", month:"long", day:"numeric"}).format(new Date(date + "T00:00:00"));
}

function go(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active-page"));
  const target = $("page-" + page);
  if (target) target.classList.add("active-page");
  document.querySelectorAll(".nav-item").forEach(n => n.classList.toggle("active", n.dataset.page === page));
  location.hash = page;
  if (page === "home") loadDashboard();
  if (page === "students") loadStudents();
  if (page === "programs") loadPrograms();
  if (page === "attendance") loadAttendance();
  if (page === "volunteers") loadPeople("volunteers");
  if (page === "trainers") loadPeople("trainers");
  if (page === "reports") loadDashboard();
}

async function loadDashboard() {
  try {
    const d = await api("dashboard.php");
    $("statStudents").textContent = d.students;
    $("statPrograms").textContent = d.programs;
    $("statVolunteers").textContent = d.volunteers;
    $("statAttendance").textContent = d.attendance_rate + "%";
    $("homeRate").textContent = d.attendance_rate + "%";
    $("homePresent").textContent = d.present;
    $("homeAbsent").textContent = Math.max(0, d.students - d.present);
    $("attendanceSub").textContent = d.present ? "تم تسجيل حضور اليوم" : "لا توجد سجلات بعد";
    $("reportStudents").textContent = d.students;
    $("reportPrograms").textContent = d.programs;
    $("reportVolunteers").textContent = d.volunteers;
    $("reportTrainers").textContent = d.trainers;

    $("activityBody").innerHTML = d.recent.length ? d.recent.map(x => `
      <tr><td>${esc(x.activity)}</td><td>${esc(x.program || "-")}</td><td>${esc(x.username || "-")}</td>
      <td>${esc(formatDate(x.created_at.slice(0,10)))}</td><td><span class="badge success">${esc(x.status || "مكتمل")}</span></td></tr>
    `).join("") : `<tr><td colspan="5" class="empty">لا توجد أنشطة بعد</td></tr>`;

    const p = await api("programs.php");
    programsCache = p.programs;
    renderHomePrograms();
  } catch (e) { console.error(e); showToast(e.message, "error"); }
}

function renderHomePrograms() {
  const active = programsCache.filter(p => p.status === "active").slice(0, 4);
  $("homePrograms").innerHTML = active.length ? active.map((p,i) => {
    const capacity = Number(p.capacity) || 0;
    const count = Number(p.student_count) || 0;
    const pct = capacity ? Math.min(100, Math.round(count/capacity*100)) : 0;
    return `<div class="program">
      <div class="program-icon blue-bg">${["🤖","⚡","🛠️","🧠"][i%4]}</div>
      <div class="program-info"><strong>${esc(p.name)}</strong><span>${count} طالب · ${esc(p.period || "غير محدد")}</span></div>
      <div class="progress-container"><span>${pct}%</span><div class="progress"><div style="width:${pct}%"></div></div></div>
    </div>`;
  }).join("") : `<div class="empty">لا توجد برامج نشطة</div>`;
}

async function loadPrograms() {
  try {
    const d = await api("programs.php");
    programsCache = d.programs;
    $("programsBody").innerHTML = d.programs.length ? d.programs.map(p => `
      <tr><td><strong>${esc(p.name)}</strong></td><td>${esc(p.period || "-")}</td>
      <td>${p.student_count}</td><td>${p.capacity || "-"}</td>
      <td><span class="badge ${p.status==="active"?"success":""}">${p.status==="active"?"نشط":p.status==="completed"?"مكتمل":"قادم"}</span></td>
      <td><button class="small-btn danger" onclick="deleteProgram(${p.id})">حذف</button></td></tr>
    `).join("") : `<tr><td colspan="6" class="empty">لا توجد برامج</td></tr>`;
    renderHomePrograms();
  } catch(e) { showToast(e.message, "error"); }
}

async function loadStudents() {
  try {
    const d = await api("students.php?action=list");
    studentsCache = d.students;
    renderStudents(studentsCache);
  } catch(e) { showToast(e.message, "error"); }
}

function renderStudents(list) {
  $("studentsBody").innerHTML = list.length ? list.map(s => `
    <tr><td><strong>${esc(s.name)}</strong></td><td>${esc(s.phone || "-")}</td><td>${esc(s.gender || "-")}</td>
    <td>${s.age || "-"}</td><td>${esc(s.program_name || "-")}</td><td>${esc(s.registration_date || "-")}</td>
    <td><button class="small-btn danger" onclick="deleteStudent(${s.id})">حذف</button></td></tr>
  `).join("") : `<tr><td colspan="7" class="empty">لا يوجد طلاب</td></tr>`;
}

async function loadAttendance() {
  const date = $("attendanceDate").value || new Date().toISOString().slice(0,10);
  $("attendanceDate").value = date;
  try {
    const d = await api("attendance.php?date=" + encodeURIComponent(date));
    attendanceCache = d.attendance;
    renderAttendance(attendanceCache);
    $("todayLabel").textContent = formatDate(date);
  } catch(e) { showToast(e.message, "error"); }
}

function renderAttendance(list) {
  $("attendanceBody").innerHTML = list.length ? list.map(s => `
    <tr><td><strong>${esc(s.name)}</strong></td><td>${esc(s.phone || "-")}</td><td>${esc(s.program_name || "-")}</td>
    <td><label class="switch"><input type="checkbox" data-student="${s.id}" ${s.status==="present"?"checked":""}><span></span></label>
    <span class="attendance-label">${s.status==="present"?"حاضر":"غائب"}</span></td></tr>
  `).join("") : `<tr><td colspan="4" class="empty">لا يوجد طلاب للتسجيل</td></tr>`;
}

async function saveAttendance() {
  const date = $("attendanceDate").value;
  const records = [...document.querySelectorAll("#attendanceBody input[data-student]")].map(i => ({
    student_id: Number(i.dataset.student),
    status: i.checked ? "present" : "absent"
  }));
  try {
    await api("attendance.php", {method:"POST", body:JSON.stringify({date, records})});
    showToast("تم حفظ الحضور بنجاح");
    loadDashboard();
  } catch(e) { showToast(e.message, "error"); }
}

async function loadPeople(type) {
  try {
    const d = await api("people.php?type=" + type);
    const body = $(type === "volunteers" ? "volunteersBody" : "trainersBody");
    body.innerHTML = d.items.length ? d.items.map(x => `
      <tr><td><strong>${esc(x.name)}</strong></td><td>${esc(x.phone || "-")}</td>
      <td>${esc(type==="volunteers" ? (x.role || "-") : (x.specialty || "-"))}</td>
      <td>${esc(x.program_name || "-")}</td><td><button class="small-btn danger" onclick="deletePerson('${type}',${x.id})">حذف</button></td></tr>
    `).join("") : `<tr><td colspan="5" class="empty">لا توجد سجلات</td></tr>`;
  } catch(e) { showToast(e.message, "error"); }
}

function openModal(title, html, onSubmit) {
  $("modalTitle").textContent = title;
  $("modalForm").innerHTML = html;
  $("modal").classList.add("open");
  $("modalForm").onsubmit = async (e) => { e.preventDefault(); await onSubmit(new FormData(e.target)); };
}

function programOptions() {
  return `<option value="">اختر البرنامج</option>` + programsCache.map(p => `<option value="${p.id}">${esc(p.name)}</option>`).join("");
}

function openStudentModal() {
  if (!programsCache.length) { loadPrograms().then(openStudentModal); return; }
  openModal("تسجيل طالب جديد", `
    <label>اسم الطالب<input name="name" required></label>
    <label>رقم الجوال<input name="phone" inputmode="tel"></label>
    <div class="form-row"><label>الجنس<select name="gender"><option value="">اختر</option><option>ذكر</option><option>أنثى</option></select></label>
    <label>العمر<input name="age" type="number" min="1" max="100"></label></div>
    <label>البرنامج<select name="program_id" required>${programOptions()}</select></label>
    <label>تاريخ التسجيل<input name="registration_date" type="date" value="${new Date().toISOString().slice(0,10)}"></label>
    <button class="primary-btn full" type="submit">حفظ وتسجيل الطالب</button>
  `, async fd => {
    await api("students.php", {method:"POST", body:JSON.stringify(Object.fromEntries(fd.entries()))});
    $("modal").classList.remove("open"); showToast("تم تسجيل الطالب بنجاح"); loadStudents(); loadDashboard();
  });
}

function openProgramModal() {
  openModal("إضافة برنامج", `
    <label>اسم البرنامج<input name="name" required></label>
    <label>الفترة<input name="period" placeholder="الفترة الصباحية / المسائية"></label>
    <label>السعة<input name="capacity" type="number" min="0" value="20"></label>
    <label>الحالة<select name="status"><option value="active">نشط</option><option value="upcoming">قادم</option><option value="completed">مكتمل</option></select></label>
    <button class="primary-btn full" type="submit">حفظ البرنامج</button>
  `, async fd => {
    await api("programs.php", {method:"POST", body:JSON.stringify(Object.fromEntries(fd.entries()))});
    $("modal").classList.remove("open"); showToast("تمت إضافة البرنامج"); loadPrograms(); loadDashboard();
  });
}

function openPersonModal(type) {
  if (!programsCache.length) { loadPrograms().then(() => openPersonModal(type)); return; }
  const volunteer = type === "volunteers";
  openModal(volunteer ? "إضافة متطوع" : "إضافة مدرب", `
    <label>الاسم<input name="name" required></label>
    <label>رقم الجوال<input name="phone" inputmode="tel"></label>
    <label>${volunteer ? "الدور" : "التخصص"}<input name="${volunteer ? "role" : "specialty"}"></label>
    <label>البرنامج<select name="program_id">${programOptions()}</select></label>
    <button class="primary-btn full" type="submit">حفظ</button>
  `, async fd => {
    await api("people.php?type="+type, {method:"POST", body:JSON.stringify(Object.fromEntries(fd.entries()))});
    $("modal").classList.remove("open"); showToast("تمت الإضافة"); loadPeople(type); loadDashboard();
  });
}

async function deleteStudent(id) {
  if (!confirm("هل أنت متأكد من حذف الطالب؟")) return;
  try { await api("students.php?id="+id, {method:"DELETE"}); showToast("تم حذف الطالب"); loadStudents(); loadDashboard(); }
  catch(e) { showToast(e.message,"error"); }
}
async function deleteProgram(id) {
  if (!confirm("حذف البرنامج؟")) return;
  try { await api("programs.php?id="+id, {method:"DELETE"}); showToast("تم حذف البرنامج"); loadPrograms(); loadDashboard(); }
  catch(e) { showToast(e.message,"error"); }
}
async function deletePerson(type,id) {
  if (!confirm("هل أنت متأكد من الحذف؟")) return;
  try { await api(`people.php?type=${type}&id=${id}`, {method:"DELETE"}); showToast("تم الحذف"); loadPeople(type); loadDashboard(); }
  catch(e) { showToast(e.message,"error"); }
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}

document.addEventListener("DOMContentLoaded", () => {
  $("todayLabel").textContent = formatDate(new Date().toISOString().slice(0,10));
  $("attendanceDate").value = new Date().toISOString().slice(0,10);

  document.querySelectorAll(".nav-item").forEach(item => item.addEventListener("click", e => {
    e.preventDefault(); go(item.dataset.page);
  }));
  document.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => go(b.dataset.go)));

  $("addStudentBtn").addEventListener("click", openStudentModal);
  $("addProgramBtn").addEventListener("click", openProgramModal);
  $("addVolunteerBtn").addEventListener("click", () => openPersonModal("volunteers"));
  $("addTrainerBtn").addEventListener("click", () => openPersonModal("trainers"));
  $("saveAttendanceBtn").addEventListener("click", saveAttendance);
  $("attendanceDate").addEventListener("change", loadAttendance);

  $("studentSearch").addEventListener("input", e => {
    const q = e.target.value.trim().toLowerCase();
    renderStudents(studentsCache.filter(s => [s.name,s.phone,s.program_name].join(" ").toLowerCase().includes(q)));
  });
  $("attendanceSearch").addEventListener("input", e => {
    const q = e.target.value.trim().toLowerCase();
    renderAttendance(attendanceCache.filter(s => [s.name,s.phone,s.program_name].join(" ").toLowerCase().includes(q)));
  });

  $("modalClose").addEventListener("click", () => $("modal").classList.remove("open"));
  $("modal").addEventListener("click", e => { if (e.target === $("modal")) $("modal").classList.remove("open"); });
  $("notificationBtn").addEventListener("click", () => showToast("لا توجد إشعارات جديدة"));

  const page = location.hash.replace("#","") || "home";
  go(["home","programs","students","attendance","volunteers","trainers","reports","settings"].includes(page) ? page : "home");
  loadPrograms();
});
