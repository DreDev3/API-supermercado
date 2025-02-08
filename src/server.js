import app from './app';

const port = process.env.APP_PORT

app.listen(port, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${port}`);
})
