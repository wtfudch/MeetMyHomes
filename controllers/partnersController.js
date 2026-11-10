const partners = require('../data/partners.json');

const getPartnersPage = (req, res) => {
  res.render('partners', { title: 'Partners', partners });
};

module.exports = { getPartnersPage };
