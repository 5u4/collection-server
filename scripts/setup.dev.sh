# App default variables
app_key=$(head /dev/urandom | LC_ALL=C tr -dc A-Za-z0-9 | head -c 24; echo '')

# Postgres default variables
postgres_container="dictionary.development"
postgres_host="0.0.0.0"
postgres_username="dictionary"
postgres_password="dictionary"
postgres_database="dictionary"
postgres_port=23428

# Set variables from command line
while [ "$1" != "" ]; do
    case $1 in
        --postgres-username ) shift
            postgres_username=$1;;
        --postgres-password ) shift
            postgres_password=$1;;
        --postgres-database ) shift
            postgres_database=$1;;
        --postgres-port ) shift
            postgres_port=$1;;
        * ) exit
    esac
    shift
done

# Create dev dotenv file
cp .env.example .env

# Update postgres database config
sed -i -E "s/^APP_KEY=$/APP_KEY=$app_key/" .env
sed -i -E "s/^DB_HOST=$/DB_HOST=$postgres_host/" .env
sed -i -E "s/^DB_PORT=$/DB_PORT=$postgres_port/" .env
sed -i -E "s/^DB_USER=$/DB_USER=$postgres_username/" .env
sed -i -E "s/^DB_PASS=$/DB_PASS=$postgres_password/" .env
sed -i -E "s/^DB_NAME=$/DB_NAME=$postgres_database/" .env

# Remove MacOS sed file
if [ -e .env-E ]
then
rm .env-E
fi

# Create postgres docker container
docker run --name $postgres_container -p $postgres_port:5432 \
    -e "POSTGRES_USER=$postgres_username" -e "POSTGRES_PASSWORD=$postgres_password" \
    -e "POSTGRES_DB=$postgres_database" -d postgres:alpine

# Install dependencies
yarn
