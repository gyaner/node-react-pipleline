const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    
    
  const token = req.headers.authorization?.split(' ')[1];
  //console.log(req.headers,"headerssssssssssssssssssssssssss");
  if (!token) return res.status(401).json({ error: 'Access denied hh' });
//  console.log(req.headers.authorization,token,"++++++++++++++",process.env.ACCESS_TOKEN_SECRET);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ error: 'Invalid token'+err});
    req.user = user;
    next();
  });
};
