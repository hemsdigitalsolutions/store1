(()=>{'use strict';
const email='hemsdigitalsolutions@gmail.com';
const dialog=document.createElement('dialog');dialog.id='feedbackDialog';dialog.dir='rtl';dialog.setAttribute('aria-labelledby','feedbackTitle');
dialog.innerHTML=`<div class="feedback-head"><div><span class="eyebrow">HEMS Digital Solutions</span><h2 id="feedbackTitle">تواصل مع HEMS</h2></div><button type="button" class="feedback-close" aria-label="إغلاق نموذج الملاحظات">×</button></div><p class="feedback-intro">اطلب تطبيقًا جاهزًا للاستخدام، أو أرسل استفسارك وملاحظاتك وسنرد عليك.</p><form id="siteFeedbackForm"><label for="feedbackName">اسمك <small>(اختياري)</small></label><input id="feedbackName" maxlength="100" autocomplete="name"><label for="feedbackEmail">بريد التواصل للرد عليك <small>(مطلوب)</small></label><input id="feedbackEmail" type="email" required maxlength="254" autocomplete="email" dir="ltr"><label for="feedbackProduct">التطبيق أو الموضوع</label><select id="feedbackProduct"><option>الموقع بشكل عام</option><option>دفتر العقار</option><option>مصاريف البيت</option><option>مولّد QR Code</option></select><label for="feedbackMessage">الطلب أو الرسالة *</label><textarea id="feedbackMessage" rows="4" maxlength="3000" required placeholder="اكتب طلبك أو استفسارك هنا…"></textarea><input name="_honey" id="feedbackHoney" tabindex="-1" autocomplete="off" aria-hidden="true" style="display:none"><p class="feedback-note">التواصل عبر بريدنا: <a href="mailto:hemsdigitalsolutions@gmail.com" dir="ltr">hemsdigitalsolutions@gmail.com</a>. عنوان التواصل أعلاه للرد عليك؛ تختار حساب الإرسال داخل تطبيق البريد، ثم تضغط «إرسال» بنفسك.</p><div class="actions"><a id="feedbackGmail" href="https://mail.google.com/mail/" class="btn" target="_blank" rel="noopener">فتح في Gmail</a><button class="btn secondary" id="sendSiteFeedback" type="submit">فتح في تطبيق البريد</button></div><p id="feedbackStatus" role="status" aria-live="polite"></p></form>`;
document.body.append(dialog);
const $=id=>document.getElementById(id);let opener;
document.querySelectorAll('[data-feedback]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();opener=a;if(a.dataset.product)$('feedbackProduct').value=a.dataset.product;$('feedbackStatus').textContent='';dialog.showModal();$('feedbackMessage').focus()}));
dialog.querySelector('.feedback-close').onclick=()=>dialog.close();dialog.addEventListener('close',()=>opener?.focus());
function prepareMessage(){const message=$('feedbackMessage').value.trim(),name=$('feedbackName').value.trim(),reply=$('feedbackEmail').value.trim(),product=$('feedbackProduct').value;
 if(!message){$('feedbackStatus').textContent='اكتب رسالتك أولًا.';$('feedbackMessage').focus();return}
 if(!reply||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reply)){$('feedbackStatus').textContent='أدخل بريد التواصل الصحيح للرد عليك.';$('feedbackEmail').focus();return}
 const subject='ملاحظاتك — HEMS — '+product,body='الاسم: '+(name||'زائر الموقع')+'\nالتطبيق: '+product+'\nبريد التواصل: '+(reply||'غير مذكور')+'\n\n'+message;
 return {subject,body};
}
$('feedbackGmail').addEventListener('click',e=>{
 const draft=prepareMessage();if(!draft){e.preventDefault();return}
 $('feedbackGmail').href='https://mail.google.com/mail/?view=cm&fs=1&to='+encodeURIComponent(email)+'&su='+encodeURIComponent(draft.subject)+'&body='+encodeURIComponent(draft.body);
 $('feedbackStatus').textContent='تفتح الرسالة في Gmail. اختر حسابك واضغط إرسال هناك؛ لم تُرسل الرسالة تلقائيًا.';
});
$('siteFeedbackForm').addEventListener('submit',e=>{
 e.preventDefault();const draft=prepareMessage();if(!draft)return;
 const a=document.createElement('a');a.href='mailto:'+email+'?subject='+encodeURIComponent(draft.subject)+'&body='+encodeURIComponent(draft.body);document.body.append(a);a.click();a.remove();
 $('feedbackStatus').textContent='اضغط إرسال داخل تطبيق البريد لإتمام الإرسال. يمكنك اختيار فتح في Gmail مباشرة بدلًا منه.';
});
})();
