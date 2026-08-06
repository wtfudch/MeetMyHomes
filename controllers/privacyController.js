const getPrivacy = (req, res) => {
  res.render('privacy-policy', { title: 'Privacy Policy' });
};

module.exports = { getPrivacy };
