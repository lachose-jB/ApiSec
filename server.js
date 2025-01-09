const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const blockchainValidator = require('./middleware/blockchainValidator');

const app = express();

// Security middleware
app.use(helmet());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Blockchain validation middleware
app.use((req, res, next) => blockchainValidator.validateAndRecord(req, res, next));

// Example protected route
app.get('/api/data', (req, res) => {
    res.json({
        data: 'Protected data',
        validation: req.blockchainValidation
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!' 
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
