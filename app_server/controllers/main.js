/* GET homepage */
const index = (req, res) => {
 res.render('index', { title: 'Netflix clone' });
};
module.exports = { 
 index
};