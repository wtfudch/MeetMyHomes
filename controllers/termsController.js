const getTerms = (req, res) => {
  res.render('terms-of-service', { title: 'Terms of Service' });
};

module.exports = { getTerms };
