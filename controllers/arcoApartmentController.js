const getArcoApartmentPage = (req, res) => {
    res.render('arcoApartment', { title: 'Arco Apartment' });
  };
  
module.exports = {getArcoApartmentPage};