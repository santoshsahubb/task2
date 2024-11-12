import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sahu.santosh998@gmail.com',  
    pass: 'tggi uxbh bkwe qwxe'   
  }
});

const sendEmail = async (name: string, mail: string) => {
  let message = `Welcome ${name}, have a nice day, greeting from my side.`
  const mailOptions = {
    from: 'sahu.santosh998@gmail.com',
    to: mail,
    subject: 'Welcome Mail',
    text: message,                  
    html: `<b>${message}</b>`        
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;

  }
};

export { sendEmail };
