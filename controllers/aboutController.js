const getAboutPage = (req, res) => {
  res.render('about', { title: 'About Us' });
};

module.exports = { getAboutPage };
