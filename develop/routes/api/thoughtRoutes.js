const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thoughtController.js');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);
router.route('/:thoughtID/reactions').post(addReaction);
router.route('/:thoughtID/reactions/:reactionID').delete(deleteReaction);
module.exports = router;