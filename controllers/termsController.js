const getTerms = (req, res) => {
    res.render('terms-of-service', { title: 'Terms of Service - Meet My Homes' }); // Add a title for consistency
  };
module.exports = {getTerms}