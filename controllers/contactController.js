// The "Send Us a Message" form on /contact submits straight from the
// visitor's browser to Web3Forms (see views/contact.ejs) — that's the
// pattern Web3Forms is designed for, and it avoids our own server having to
// make an outbound request that gets flagged by Cloudflare's bot protection
// when called server-to-server from cloud/datacenter IPs (Render included).
const getContactPage = (req, res) => {
  res.render('contact', { title: 'Contact Us', web3formsKey: process.env.WEB3FORMS_ACCESS_KEY });
};

module.exports = { getContactPage };
