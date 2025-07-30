const getPrivacy = (req, res) => {
    res.render('privacy-policy', { title: 'Privacy Policy' }); // Add a title for consistency
  };
module.exports = {getPrivacy}