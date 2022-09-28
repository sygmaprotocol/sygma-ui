touch .env

for envvar in "$@"
do
  echo "$envvar" >> ./packages/sygma-ui/.env
done