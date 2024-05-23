import { create, router as _router, defaults } from 'json-server';
const server = create();
const router = _router('db.json');
const middlewares = defaults();

server.use(middlewares);
server.use(router);
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
