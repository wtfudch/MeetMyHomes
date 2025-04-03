const getContactPage = (req, res) => {
    res.render('contact', { title: 'Contact Us' }); // Add a title for consistency
  };
  
const submitContactForm = (req, res) => {
  const { name, email, message } = req.body;
  
  // Handle form data (e.g., save to database, send email, etc.)
  console.log('Form Submission:', { name, email, message });
    // Redirect or show a success message
  res.redirect('/contact?success=true');
};
  
module.exports = { getContactPage, submitContactForm };