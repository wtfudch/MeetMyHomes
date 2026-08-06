const getContactPage = (req, res) => {
  res.render('contact', { title: 'Contact Us' });
};

const submitContactForm = (req, res) => {
  const { name, email, message } = req.body;
  // TODO: integrate email service (e.g. nodemailer + SendGrid)
  console.log('Contact form submission:', { name, email, message });
  res.redirect('/contact?success=true');
};

module.exports = { getContactPage, submitContactForm };
