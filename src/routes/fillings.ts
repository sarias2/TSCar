import { Router } from 'express';
import { check } from 'express-validator';

import { getFillings, deleteFilling, storeFilling, updateFilling, getSingleFilling } from '../controllers/fillings';

const router = Router();

router.get('/', getFillings);

router.get('/:id', getSingleFilling);

router.post('/', check(['km', 'volume'], 'This is a required field').not().isEmpty(), storeFilling);

router.put('/:id', [
        check(['km', 'volume'], 'This is a required field').not().isEmpty()
    ],
    updateFilling
);

router.delete('/:id', deleteFilling)

module.exports = router;