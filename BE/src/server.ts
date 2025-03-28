import app from './main';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
