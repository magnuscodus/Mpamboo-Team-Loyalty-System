const express = require('express');
const router = require('router');

// * Trovo Login Redirect
router.get('/auth', (req, res) => res.send('Trovo Login'));

// * MTM Login
router.get('/login', (req, res) => res.send('Website Login'));

module.exports = router;
