# Fablab Management System — GitHub Pages Edition

نسخة Static/Demo مخصصة للنشر على GitHub Pages.

## ماذا تعمل؟
- موقع عام قابل للتصفح بدون تسجيل دخول.
- صفحات: الرئيسية، البرامج، عن فاب لاب، تواصل معنا.
- تسجيل دخول تجريبي حسب الدور.
- إنشاء حساب طالب.
- بوابة طالب / موظف / مدير مختلفة.
- المدير يستطيع إضافة البرامج وإنشاء حسابات الموظفين وإدارة بيانات العرض.
- الحضور والبيانات التجريبية تعمل داخل المتصفح باستخدام LocalStorage.
- الخصوصية: أعداد التسجيل والسعات والإحصائيات الإدارية لا تظهر في واجهة الطالب أو الموقع العام.

## الحسابات التجريبية
المدير:
- Email: admin@fablab.local
- Password: Admin@12345

الموظف:
- Email: employee@fablab.local
- Password: Employee@12345

## مهم
هذه نسخة GitHub Pages Static/Demo، لذلك لا تستخدم PHP أو MySQL أو كلمات مرور حقيقية. البيانات تُخزن في LocalStorage على جهاز الزائر.

لنسخة إنتاجية حقيقية، انقل الـbackend إلى استضافة PHP/MySQL أو API منفصل، ولا تستخدم LocalStorage للمصادقة الحقيقية.

## النشر
في GitHub Repository:
Settings → Pages → Deploy from branch → main → /(root) → Save

بعدها افتح رابط Pages الذي يعرضه GitHub.
