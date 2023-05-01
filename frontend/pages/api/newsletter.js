const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY);

function formValid(body) {
  return body.email;
}

export default function handler(req, res) {

  if (!formValid(req.body)) {
    res.status(422).end();
    return;
  }

  console.log('API/NEWSLETTER *** req.body', req.body);
  console.log('API/NEWSLETTER *** req.body.email', req.body.email);

  const message = `
    Email: ${req.body.email}rn
  `;

  const dataRes = {
    //to: 'violeta_matanska@abv.bg',
    to: process.env.NEXT_PUBLIC_EMAIL_SEND_TO, // list of receivers
    from: "Violeta.Matanska@bs-shipmanagement.com",
    subject: "Newsletter Form - New submission!",
    text: message,
    //html: message.replace(/rn/g, '<br>'),
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">      
        <title>New Subscribe to our newslatter From Website</title>
        <meta name="description" content="New submission - Cantact form">
        <meta name="author" content="SitePoint">
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />      
        <link rel="stylesheet" href="css/styles.css?v=1.0">      
      </head>     
      <body>
        <div class="img-container" style="display: flex; justify-content: center; align-items: center; border-radius: 5px; overflow: hidden; font-family: 'helvetica', 'ui-sans';">
        
        </div>
        <div class="container" style="margin-left: 20px;margin-right: 20px;">
          <h3>You've got a new mail from ${req.body.name}, their email is: ✉️${req.body.email} </h3>
          <div style="font-size: 16px;">
            <p>The following information was submitted:</p>
            <p>${req.body.email}</p>
            <br>
          </div>
          <img src="https://manuarora.in/logo.png" class="logo-image" style="height: 50px;width: 50px;border-radius: 5px;overflow: hidden;">
          <p class="footer" style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #D1D5DB;">Regards<br>Website admin<br>Software Developer<br>+357 99999999</p>
          <div class="footer-links" style="display: flex;justify-content: center;align-items: center;">
            <a href="https://manuarora.in/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Website</a>
            <a href="https://manuarora.in/blog/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Blog</a>
            <a href="https://github.com/manuarora700/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">GitHub</a>
            <a href="https://instagram.com/maninthere/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Instagram</a>
            <a href="https://linkedin.com/in/manuarora28/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">LinkedIn</a>
            <a href="https://twitter.com/mannupaaji/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Twitter</a>               
          </div>
        </div>
      </body>
      </html>`,
  };

  let data = {"data" : req.body};
  console.log('NEWSLETTER FORM Component ==== data ', data);

  let config = {
    method: 'post',
    headers: {
      'Authorization': 'no',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  };
  console.log('NEWSLETTER FORM Component ==== CONFIG ', config);
  
  const responseFetch = async () => { 
    try {
      const res = await fetch(`http://127.0.0.1:1337/api/createCustom`, config);
      const data = await res.json();
      console.log('API NEWSLETTER  - data ', data);
      console.log('API NEWSLETTER  - res.ok ', res.ok);
      //if (res.ok) {
        return data;
      //} 
      //throw new Error('Error sending email.');
    } catch (err) {
      console.log('API NEWSLETTER  - error',err);
    }
  }
  responseFetch();

  try {
    return mail
      .send(dataRes)
        .then((res) => {
          console.log('API NEWSLETTER MAIL  - res - mail.send', res);   
          console.log('API NEWSLETTER MAIL  - res.Response', res.Response);
          //console.log('API NEWSLETTER  - statusCode', res.statusCode);
          return res.status(200).end();
        })
        .catch((error) => {
          console.log('API NEWSLETTER MAIL  - error1', error);
          return res.status(500).send(error);
        });
  } catch(err) {
    console.log('API NEWSLETTER MAIL MMMMMMMMMMMMMMMMMMM - err2', err);
  }
        
  res.status(200).json(req.body);


/* 
    (async () => {
      try {
        const rawResponse = await fetch(`http://127.0.0.1:1337/api/createCustom`, config);
        console.log('API NEWSLETTER YYYYYYYYYYYYYYY - rawResponse ', rawResponse);
        if (!rawResponse.ok) 
          throw new Error("HTTP error rawResponse.status = " + rawResponse.status);
        const data = await rawResponse.json();
        console.log('API NEWSLETTER YYYYYYYYYYYYYYY - data ', data);
        return data;
      } catch(err) {
        console.log('API NEWSLETTER CATCH YYYYYYYYYYYY - err22', err);
      }
    })();
*/
  
  
}