import config from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './server/routes/UserRoutes';
import propertyRoutes from './server/routes/PropertyRoutes'

config.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

app.use('/api/v1', userRoutes);
app.use('/api/v1', propertyRoutes);

// When a random route is inputed
app.get('*', (req, res) => res.status(404).send({
  message: "Invalid API Endpoint. Not Found. Sorry!"
}));

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;
