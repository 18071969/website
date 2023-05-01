const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY);

function formValid(body) {
  return body.name && body.email && body.message;
}

export default function handler(req, res) {

  if (!formValid(req.body)) {
    res.status(422).end();
    return;
  }

  console.log('API/MAIL *** req.body', req.body);
  console.log('API/MAIL *** req.body.name', req.body.name);

  const message = `
    Name: ${req.body.name}rn
    Email: ${req.body.email}rn
    Message: ${req.body.message}
  `;

  const dataRes = {
    //to: 'violeta_matanska@abv.bg',
    to: process.env.NEXT_PUBLIC_EMAIL_SEND_TO, // list of receivers
    from: "Violeta.Matanska@bs-shipmanagement.com",
    subject: "Contact Form - New submission!",
    text: message,
    //html: message.replace(/rn/g, '<br>'),
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">      
        <title>New Message From Website</title>
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
            <p>${req.body.message}</p>
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

  try {
    return mail
      .send(dataRes)
        .then(() => {
          console.log('res', res.json);
          return res.status(200).end();
        })
        .catch((error) => {
          console.log('error1', error);
          return res.status(500).send(error);
        });
  } catch(err) {
    console.log('err2', err);
  }
        
  res.status(200).json(req.body);
}