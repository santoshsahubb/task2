import { sendEmail } from './emailService';
sendEmail('John Doe', 'john.doe@example.com')
.then(() => {
  console.log('Email sent successfully!');
})
.catch((error) => {
  console.error('Error sending email:', error);
});