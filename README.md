# Dictionary

## Setup

Create a postgres database in docker

```bash
docker run --name dictionary_postgres -p 5432:5432 \
    -e POSTGRES_USER=dictionary -e POSTGRES_PASSWORD=dictionary \
    -e POSTGRES_DB=dictionary -d postgres:alpine
```
