# 42-charts-database-manager

### INSTALLATION

#### STEP 0 (node & grunt)
Make sure [nodejs](https://nodejs.org/en/) is installed on your computer then

$> `npm install -g grunt-cli`

#### STEP 1 (project & node_modules)
$> `git clone https://github.com/yfuks/42-charts-database-manager.git . && cd 42-charts-database-manager && npm i`

#### STEP 2 (ENVIRONMENT VARIABLES)
In the project root $> `touch .env`

then in your file add the folowing keys (change what you need)
```gradle
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=42Charts
FT_API_ENDPOINT=https://api.intra.42.fr
FT_API_UID=MY_APP_UID
FT_API_SECRET=MY_APP_SECRET
FT_API_RATE_LIMIT_PER_SECOND=1.9
FT_API_RATE_LIMIT_PER_HOUR=1150
```

#### STEP 3 (START)

$> `npm run scripts`
