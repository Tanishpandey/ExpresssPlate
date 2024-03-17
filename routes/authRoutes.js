const express = require('express');
const router = express.Router()
const cors = require('cors')
const { test, registerUser, loginUser, postMenu } = require('../controllers/authController')

//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

// Define route to fetch company data
router.get('/company', async (req, res) => {
  try {
    // Fetch company data from the database
    const company = await CompanyModel.findOne(); // Assuming you only have one company document
    if (!company) {
      res.status(404).json({ error: 'Company data not found' });
      return;
    }
    res.json(company); // Return fetched company data as JSON
  } catch (error) {
    console.error('Error fetching company data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/company-dashboard', postMenu)



module.exports = router
