import express from 'express';


const router = express.Router();
router.post('/new-user',(req,res) => {
    res.send('New user created');
});
export default router;