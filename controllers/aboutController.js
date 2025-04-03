const getAboutPage = (req, res) => {
    res.render('about', { 
      title: 'About Us',
      companyInfo: {
        name: 'MeetMyHomes',
        founded: 2018,
        mission: 'To help people find their perfect home with transparency and care',
        team: [
          { name: 'John Doe', role: 'Founder & CEO' },
          { name: 'Jane Smith', role: 'Head of Sales' },
          { name: 'Alex Johnson', role: 'Customer Relations' }
        ],
        stats: {
          propertiesSold: 250,
          happyClients: 200,
          citiesCovered: 15
        }
      }
    });
};
  
module.exports = { getAboutPage };