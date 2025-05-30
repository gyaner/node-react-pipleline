const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateTokens');

let refreshTokens = []; // Temporary store for refresh tokens (use a database in production)

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {

 const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    
    refreshTokens.push(refreshToken);
    const data= await User.findByIdAndUpdate(user._id, { refreshToken }); 
    //console.log(data,"?????????????????????????????????");
    //res.send(data)
     res.cookie('refreshToken', refreshToken, { 
      httpOnly: true, 
     
      sameSite: 'None',    // Prevent CSRF attacks
      //maxAge: 7 * 24 * 60 * 60 * 1000, // Valid for 7 days  
      //secure: process.env.NODE_ENV === 'production', // Ensure it's only set over HTTPS
      secure:true,
      path: '/',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Set expiration to 7 day
      });
   res.json({ accessToken,refreshToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




exports.refreshToken = async (req, res) => {

  const { refreshToken } = req.cookies;
console.log(req.cookies,"req.cookies")
   if (!refreshToken) return res.status(403).json({ error: 'Access Denied' });

  try {
    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(403).json({ error: 'Invalid Refresh Token' });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) return res.status(403).json({ error: 'Invalid Refresh Token' });

      const newAccessToken = generateAccessToken(payload.userId);
      res.json({ accessToken: newAccessToken });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.logout = (req, res) => {
  const { refreshToken } = req.cookies;
  refreshTokens = refreshTokens.filter(token => token !== refreshToken);
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
};
