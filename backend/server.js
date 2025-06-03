const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const AES_KEY = Buffer.from(process.env.AES_KEY || '0123456789abcdef0123456789abcdef', 'hex');
const AES_IV = Buffer.from(process.env.AES_IV || 'abcdef9876543210abcdef9876543210', 'hex');

app.use(cors());
app.use(bodyParser.json());

const users = [];
const secrets = [];

function encrypt(text) {
  const cipher = crypto.createCipheriv('aes-256-cbc', AES_KEY, AES_IV);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(encrypted) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', AES_KEY, AES_IV);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

app.post('/api/auth/signup', async (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ error: 'User already exists' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ username, passwordHash });
  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
});

app.post('/api/secrets', authMiddleware, (req, res) => {
  const { text } = req.body;
  const encryptedText = encrypt(text);
  const id = secrets.length + 1;

  secrets.push({
    id,
    owner: req.user.username,
    encryptedText
  });

  res.status(201).json({ message: 'Secret stored successfully' });
});

app.get('/api/secrets', authMiddleware, (req, res) => {
  const userSecrets = secrets
    .filter(secret => secret.owner === req.user.username)
    .map(secret => ({
      id: secret.id,
      text: decrypt(secret.encryptedText)
    }));

  res.json(userSecrets);
});

app.get('/', (req, res) => {
  res.send('DevVault API running.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
