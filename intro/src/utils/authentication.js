const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'pveb_showtime';
const adminUsername = process.env.ADMIN_USERNAME || 'admin';
const adminPassword = process.env.ADMIN_PASSWORD || 'adminpass';
const jwtOpts = { algorithm: 'HS256', expiresIn: '30d' };

// token koji treba proslediti je:
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pblVzZXJuYW1lIjoiYWRtaW4iLCJhZG1pblBhc3N3b3JkIjoiYWRtaW5wYXNzIn0.317Up6YZoeu3lKcxVzBxDEvjyVCxpHkktnhaKGuqtOs

const verifyToken = (req, res, next) => {
  let token1 = req.headers['Authorization'];

  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pblVzZXJuYW1lIjoiYWRtaW4iLCJhZG1pblBhc3N3b3JkIjoiYWRtaW5wYXNzIn0.317Up6YZoeu3lKcxVzBxDEvjyVCxpHkktnhaKGuqtOs";
  if (!token) {
    return res.status(403).json({ auth: false, message: 'Nije prosledjen token.' });
  }

  jwt.verify(token, jwtSecret, (error, adminData) => {
    if (error) {
      return res
        .status(500)

        .json({ error: error, auth: false, message: 'Doslo je do problema prilikom provere tokena.' + token });
    }
    if (
      adminData.adminUsername != adminUsername ||
      adminData.adminPassword != adminPassword
    ) {
      return res.status(403).json({auth: false, message: 'Pogresno korisnicko ime i/ili sifra'});
    }

    next();
  });
};

module.exports = verifyToken;
