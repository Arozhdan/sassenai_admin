export default {
  async afterCreate(event) {
    const result = event.result;
    const { email, name } = result;

    const isCyrillic = /[а-яА-ЯЁё]/.test(name);
    const template = isCyrillic ? cyrillicTemplate(name) : latinTemplate(name);
    console.log('isCyrillic', isCyrillic);

    try {
      await strapi.plugins['email'].services.email.send({
        to: email,
        from: 'no-reply@sassendigital.com',
        replyTo: 'info@sassendigital.com',
        subject: template.subject,
        html: template.html,

      })
    } catch (err) {
      console.log(err);
    }

  },
};


const cyrillicTemplate = (name) => ({
  subject: 'Ваша заявка на бесплатный разбор подтверждена - Sassen Digital Marketing',
  html: `
  <p>Уважаемый(ая) ${name},</p>
  <p>Благодарим Вас за проявленный интерес к нашим услугам и за то, что Вы нашли время для заполнения контактной формы на нашем сайте.</p>
  <p>Мы рады сообщить Вам, что получили Ваш запрос на бесплатный разбор Вашего проекта. В Sassen Digital Marketing мы гордимся тем, что предоставляем комплексные цифровые решения, которые соответствуют уникальным потребностям наших клиентов. Мы понимаем, что каждый бизнес имеет свою историю и стремится к росту, и мы с нетерпением ждем возможности узнать больше о Вашем.</p>
  <p>Ваш запрос очень важен для нас, и мы уже приступили к рассмотрению предоставленной Вами информации.</p>
  <p>Мы стремимся обеспечивать быстрые ответы, поэтому ожидайте, что мы свяжемся с Вами в течение 3 рабочих дней и пригласим Вас на встречу в Zoom. Вы сможете выбрать подходящее время и дату. Эта встреча позволит нам лучше понять Ваши бизнес-цели, изучить потенциальные области роста и показать, как наш опыт может помочь вывести Ваш бизнес на новый уровень.</p>
  <p>Пожалуйста, следите за своим почтовым ящиком и также проверьте папку "Спам", на случай, если наше письмо попадет туда.   
  <p>Если у Вас возникнут какие-либо вопросы или проблемы, не стесняйтесь обращаться к нам по электронной почте info@sassendigital.com </p>
  <p>Мы с нетерпением ждем возможности связаться с Вами в ближайшее время и обсудить потенциальные пути развития Вашего бизнеса. </p>
  <p>Еще раз благодарим Вас за выбор Sassen Digital Marketing.</p>
  <p>С уважением,</p>
  


  ${signature}
  `,
});

const latinTemplate = (name) => ({
  subject: 'Your Request for a Free Evaluation is Confirmed - Sassen Digital Marketing',
  html: `
  <p>Dear ${name},</p>
  <p>Thank you for your interest in our services and for taking the time to complete the contact form on our website.</p>
  <p>We are pleased to inform you that we have received your request for a free business evaluation. At Sassen Digital Marketing, we pride ourselves on providing comprehensive digital solutions that cater to the unique needs of our clients. We understand that each business has its own unique story and growth aspirations, and we are excited to learn more about yours.</p>
  <p>Your inquiry is very important to us, and we are currently in the process of reviewing the information you provided. </p>
  <p>We strive to deliver prompt responses, so you can expect to hear back from us within 3 business days with a confirmation and an invitation to a Zoom meeting. You will be able to pick a prefferable time and date. This meeting will provide a platform for us to better understand your business objectives, explore potential areas of growth, and present how our expertise can help elevate your business to the next level.</p>
  <p>Please keep an eye on your inbox, and also check your spam or junk folder just in case our email lands there.</p>
  <p>Should you have any immediate questions or concerns, don't hesitate to contact us at info@sassendigital.com</p>
  <p>We look forward to connecting with you soon and discussing the potential avenues for growing your business.</p>
  <p>Thank you once again for choosing Sassen Digital Marketing.</p>
  <p>Best Regards,</p>



  ${signature}
  `
});

const signature = `
<div dir="ltr" original_target="https://instagram.com/marina_sassen?igshid=ntc4mtiwnjq2yq==">
<table style="color:rgb(0,0,0);box-sizing:border-box;border-collapse:collapse;border-spacing:0px;width:523.28125px;vertical-align:-webkit-baseline-middle;font-size:medium;font-family:Arial">
<tbody style="box-sizing:border-box">
<tr style="box-sizing:border-box;margin:0px">
<td style="box-sizing:border-box;margin:0px">
<table style="box-sizing:border-box;border-collapse:collapse;width:523.28125px;vertical-align:-webkit-baseline-middle">
<tbody style="box-sizing:border-box">
<tr style="box-sizing:border-box;margin:0px">
<td width="150" style="box-sizing:border-box;margin:0px;vertical-align:middle"><span style="box-sizing:border-box;margin-right:20px;display:block"><img src="https://ci3.googleusercontent.com/proxy/IG1joiMYt5G3jbSeb0-4aum9aL6qdrE8fLTrTa8uAHs7kVNg7oVz86fCZe3qSCEWVcrMkD4yFzHMWHaM2RGzKQiNR-BxcY3D2uPfpaI7BbnfybA=s0-d-e1-ft#https://drive.google.com/uc?id=10fan5ZdNhKOiHxRs8tyW7ciOKQiJoAGW" width="130" style="box-sizing:border-box;border-style:none;max-width:130px" class="CToWUd" data-bit="iit"></span></td>
<td style="box-sizing:border-box;margin:0px;vertical-align:middle">
<h2 color="#000000" style="box-sizing:border-box;font-size:18px;font-weight:600;line-height:1.38;margin:0px">
<span style="box-sizing:border-box">Marina</span><span style="box-sizing:border-box">&nbsp;</span><span style="box-sizing:border-box"><span class="il">Sassen</span></span></h2>
<p color="#000000" style="box-sizing:border-box;font-size:14px;font-weight:300;line-height:22px;margin:0px">
<span style="box-sizing:border-box">Founder and CEO</span></p>
<p color="#000000" style="box-sizing:border-box;font-size:14px;font-weight:500;line-height:22px;margin:0px">
<span style="box-sizing:border-box"><span class="il">Sassen</span> <span class="il">Digital</span> Marketing</span></p>
</td>
<td width="30" style="box-sizing:border-box;margin:0px">
<div style="box-sizing:border-box"></div>
</td>
<td color="#1723c7" width="1" height="auto" style="box-sizing:border-box;border-width:0px 0px medium 1px;border-style:none none none solid;border-color:currentcolor currentcolor currentcolor rgb(23,35,199);margin:0px;width:1px">
</td>
<td width="30" style="box-sizing:border-box;margin:0px">
<div style="box-sizing:border-box"></div>
</td>
<td style="box-sizing:border-box;margin:0px;vertical-align:middle">
<table style="box-sizing:border-box;border-collapse:collapse;width:156.921875px;vertical-align:-webkit-baseline-middle">
<tbody style="box-sizing:border-box">
<tr height="25" style="box-sizing:border-box;margin:0px;vertical-align:middle">
<td width="30" style="box-sizing:border-box;margin:0px;vertical-align:middle">
<table style="box-sizing:border-box;border-collapse:collapse;width:30px;vertical-align:-webkit-baseline-middle">
<tbody style="box-sizing:border-box">
<tr style="box-sizing:border-box;margin:0px">
<td style="box-sizing:border-box;margin:0px;vertical-align:bottom"><span color="#1723c7" width="11" style="box-sizing:border-box;display:inline-block;background-color:rgb(23,35,199)"><img src="https://ci5.googleusercontent.com/proxy/u9Dqq8IRTYcA9pxGhij8X1100IBTEBNk6GfgLex2wy5mIUGt4EvtpI__1csTElV-MUMrqJCa2SjWZkRDmYNbTv260GIk6RQb8BWD6Fub4s38olgLolJ-Y0ZMzSkDaCxhCmOgByGso4GxlMz7=s0-d-e1-ft#https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/email-icon-2x.png" color="#1723c7" alt="emailAddress" width="13" style="box-sizing:border-box;border-style:none;display:block;background-color:rgb(23,35,199)" class="CToWUd" data-bit="iit"></span></td>
</tr>
</tbody>
</table>
</td>
<td style="box-sizing:border-box;margin:0px"><a href="mailto:info@sassendigital.com" color="#000000" style="box-sizing:border-box;background-color:rgba(0,0,0,0);font-size:12px" target="_blank" saprocessedanchor="true"><span style="box-sizing:border-box">info@<span class="il">sassendigital</span>.com</span></a></td>
</tr>
<tr height="25" style="box-sizing:border-box;margin:0px;vertical-align:middle">
<td width="30" style="box-sizing:border-box;margin:0px;vertical-align:middle">
<table style="box-sizing:border-box;border-collapse:collapse;width:30px;vertical-align:-webkit-baseline-middle">
<tbody style="box-sizing:border-box">
<tr style="box-sizing:border-box;margin:0px">
<td style="box-sizing:border-box;margin:0px;vertical-align:bottom"><span color="#1723c7" width="11" style="box-sizing:border-box;display:inline-block;background-color:rgb(23,35,199)"><img src="https://ci5.googleusercontent.com/proxy/bDGbdhNSZAZaKWHjXdHMW3DL3PklwLU9F5lSquHVukVuOVNDm_0LSPw8ckOtJwduaqdVOyJnATN5reUqPaX3QjUNCZkwbG2Ac8UdOzrywgI_nREPLk66UFxOhX3uiKMJOqLfWEBJyXQ51Tk=s0-d-e1-ft#https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/link-icon-2x.png" color="#1723c7" alt="website" width="13" style="box-sizing:border-box;border-style:none;display:block;background-color:rgb(23,35,199)" class="CToWUd" data-bit="iit"></span></td>
</tr>
</tbody>
</table>
</td>
<td style="box-sizing:border-box;margin:0px"><a href="https://sassendigital.com/" color="#000000" style="box-sizing:border-box;background-color:rgba(0,0,0,0);font-size:12px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://sassendigital.com/&amp;source=gmail&amp;ust=1688420932474000&amp;usg=AOvVaw1ebn6XMbGlnfZLfOoyA9v_" saprocessedanchor="true"><span style="box-sizing:border-box"><span class="il">sassendigital</span>.com</span></a></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr style="box-sizing:border-box;margin:0px">
<td style="box-sizing:border-box;margin:0px">
<table style="box-sizing:border-box;border-collapse:collapse;width:523.28125px;vertical-align:-webkit-baseline-middle">
<tbody style="box-sizing:border-box">
<tr style="box-sizing:border-box;margin:0px">
<td height="30" style="box-sizing:border-box;margin:0px"></td>
</tr>
<tr style="box-sizing:border-box;margin:0px">
<td color="#1723c7" width="auto" height="1" style="box-sizing:border-box;border-width:0px 0px 1px medium;border-style:none none solid;border-color:currentcolor currentcolor rgb(23,35,199);margin:0px;width:523.28125px;display:block">
</td>
</tr>
<tr style="box-sizing:border-box;margin:0px">
<td height="30" style="box-sizing:border-box;margin:0px"></td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr style="box-sizing:border-box;margin:0px">
<td style="box-sizing:border-box;margin:0px">
<table style="box-sizing:border-box;border-collapse:collapse;width:523.28125px;vertical-align:-webkit-baseline-middle">
<tbody style="box-sizing:border-box">
<tr style="box-sizing:border-box;margin:0px">
<td style="box-sizing:border-box;margin:0px;vertical-align:top"></td>
<td style="box-sizing:border-box;margin:0px;text-align:right;vertical-align:top">
<table style="box-sizing:border-box;border-collapse:collapse;width:523.28125px;display:inline-block;vertical-align:-webkit-baseline-middle">
<tbody style="box-sizing:border-box">
<tr style="box-sizing:border-box;margin:0px">
<td style="box-sizing:border-box;margin:0px"><a href="https://www.facebook.com/sassendigital/" color="#6a78d1" style="box-sizing:border-box;background-color:rgb(106,120,209);display:inline-block" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/sassendigital/&amp;source=gmail&amp;ust=1688420932474000&amp;usg=AOvVaw1uGgTqwut2uPGSZyizbvG0" saprocessedanchor="true"><img src="https://ci6.googleusercontent.com/proxy/CsU8Viqi3BJDAFLrGZPksmkYgWVO33uPMuUPYTdIjlZGkYPTUoI_vJDzFKjQFwApPgNeOzuP2McTvftBr9y45oU4K7hT_3YVrqR7L-3VwYbeIS13VrCdWig_8JnKG5CZ_mBs7omd-uFCFStjfCVo=s0-d-e1-ft#https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/facebook-icon-2x.png" alt="facebook" color="#6a78d1" height="24" style="box-sizing:border-box;border-style:none;background-color:rgb(106,120,209);max-width:135px;display:block" class="CToWUd" data-bit="iit"></a></td>
<td width="5" style="box-sizing:border-box;margin:0px">
<div style="box-sizing:border-box"></div>
</td>
<td style="box-sizing:border-box;margin:0px"><a href="https://instagram.com/marina_sassen?igshid=NTc4MTIwNjQ2YQ==" color="#6a78d1" style="box-sizing:border-box;background-color:rgb(106,120,209);display:inline-block" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://instagram.com/marina_sassen?igshid%3DNTc4MTIwNjQ2YQ%3D%3D&amp;source=gmail&amp;ust=1688420932475000&amp;usg=AOvVaw2yZuQgBLvEAF9ztSvCSlNz" saprocessedanchor="true"><img src="https://ci4.googleusercontent.com/proxy/N8g6tZ7eglyo7c_6d8oDw66CnB6TXXjsEzJARvc9fD3jikHSnoEtAs2zQjlpsa6zX3aAyD6apMdrUeWhCbbT_8rbyW-AqHOjfQQWIa_UrT_KpQ4kKh1zjDP5nh-osDYyAh4XeiSmeBBT1nFHzi8PtQ=s0-d-e1-ft#https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/instagram-icon-2x.png" alt="instagram" color="#6a78d1" height="24" style="box-sizing:border-box;border-style:none;background-color:rgb(106,120,209);max-width:135px;display:block" class="CToWUd" data-bit="iit"></a></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<br>
</div>
`