<p align="center"><img src="img/collection.png" width="30%"></p>

# Collection

The project uses [docker](https://www.docker.com/) in development and production.

## Development

**Setup**

```bash
yarn setup:dev
```

**Start server**

```bash
yarn dev
```

## Production

**Setup**

```bash
yarn setup:prod --password <database-password>
```

**Start server**

```bash
docker-compose up
```
