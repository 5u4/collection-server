# Postgres default variables
postgres_host="database"
postgres_username="dictionary"
postgres_database="dictionary"
postgres_port=5432
printpass=0

# Read database password
while [ "$1" != "" ]; do
    case $1 in
        --password ) shift
            postgres_password=$1;;
        --random ) shift
            postgres_password=$(head /dev/urandom | LC_ALL=C tr -dc A-Za-z0-9 | head -c 24; echo '')
            printpass=1;;
        * ) exit 1
    esac
    shift
done

# Verify password
if [ -z ${postgres_password} ]
then
echo Database password should be provided through \"--password\" or \"--random\".
exit 1
fi

# Backup dev dotenv file
if [ -e .env ]
then
mv -f .env .env.backup
fi

# Create prod dotenv file
cp -f .env.example .env

# Update postgres database config
sed -i -E "s/^DB_HOST=$/DB_HOST=$postgres_host/" .env
sed -i -E "s/^DB_PORT=$/DB_PORT=$postgres_port/" .env
sed -i -E "s/^DB_USER=$/DB_USER=$postgres_username/" .env
sed -i -E "s/^DB_PASS=$/DB_PASS=$postgres_password/" .env
sed -i -E "s/^DB_NAME=$/DB_NAME=$postgres_database/" .env

# Create docker services
docker-compose build

# Remove MacOS sed file
if [ -e .env-E ]
then
rm .env-E
fi

# Restore dev dotenv file
if [ -e .env.backup ]
then
mv -f .env.backup .env
fi

# Print password
if [ $printpass -eq 1 ]
then
echo Password:
echo $postgres_password
fi
