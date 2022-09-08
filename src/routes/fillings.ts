import { Router } from 'express';
import { check } from 'express-validator';

import { getFillings, deleteFilling, storeFilling, updateFilling } from '../controllers/fillings';

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