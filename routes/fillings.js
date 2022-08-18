const { Router } = require('express');
const { check } = require('express-validator');

const { getFillings, deleteFilling, storeFilling, updateFilling } = require('../controllers/fillings');

const router = Router();

router.get('/', getFillings);

router.post('/', check(['km', 'volume'], 'This is a required field').not().isEmpty(), storeFilling);

router.put('/:id', [
        check(['km', 'volume'], 'This is a required field').not().isEmpty()
    ],
    updateFilling
);

router.delete('/:id', deleteFilling)

module.exports = router;