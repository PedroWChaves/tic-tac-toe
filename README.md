## Para iniciar o projeto

```
cd backend
npm i // ou npm install

cd ../frontend
npm i // ou npm install
```

## Para rodar o projeto

### Terminal 1:

```
cd backend
npm run start
```

O servidor roda em: [http://localhost:8080](http://localhost:8080)

Se tiver problema, confere se a porta não está ocupada, ou muda no código

OBS: Ao salvar alguma mudança, o servidor reinicia e aplica as alterações

### Terminal 2:

```
cd frontend
npm run start
```

O cliente roda em: [http://localhost:3000](http://localhost:3000)

O próprio React abre uma guia no navegador padrão e altera a porta se a 3000 tiver ocupada

OBS: Ao salvar alguma mudança, o React teoricamente atualiza, mas pode dar umas bugadinhas. Então não custa dar um F5, ainda mais se mexer com o servidor.
