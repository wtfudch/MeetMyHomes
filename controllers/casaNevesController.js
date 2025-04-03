const getCasaNevesPage = (req, res) => {
  res.render('casaNeves', {
    title: 'Casa Neves',
    coordinates: { lat: 32.71394729614258, lng:-17.147069931030273 }, // Pass dynamic coordinates
    address: "123+Main+St,Lisbon,Portugal" // URL-friendly address
  });
};
module.exports = {getCasaNevesPage};