import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Well Done');
});

app.listen(3000, () => {
    console.log('Running application on port 3000');
})