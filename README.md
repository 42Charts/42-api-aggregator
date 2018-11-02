# 42-API-AGGREGATOR

📡 42 API AGGREGATOR scrape 42 api school into a mysql DB with only *usefull* informations using [nodejs](https://nodejs.org/en/docs/) & [gruntjs](https://gruntjs.com/)

<<<<<<< HEAD
#### STEP 0 (node & grunt)
Make sure [nodejs](https://nodejs.org/en/) is installed on your computer then

$> `npm install -g grunt-cli`

#### STEP 1 (project & node_modules)
$> `git clone https://github.com/yfuks/42-charts-database-manager.git . && cd 42-charts-database-manager && npm i`
=======
See [tables](https://github.com/yfuks/42-API-AGGREGATOR/wiki/Table-of-contents)
>>>>>>> 30bdf216d6133ba0ee4a698d1f088e998c14601d

## Getting started

### (node & grunt)

- Install [nodejs](https://nodejs.org/) and make sure `npm` is in your **PATH**
- Install grunt $> `npm install -g grunt-cli`

### (project & node_modules)

$> `git clone https://github.com/yfuks/42-API-AGGREGATOR.git && cd 42-API-AGGREGATOR && npm i`

Create a new app on [42 Intranet](https://profile.intra.42.fr/oauth/applications)

### (Environments variables)
In the project root $> `touch .env`

<<<<<<< HEAD
then in your file add the folowing keys (change what you need)
=======
then in your file add the following keys
>>>>>>> 30bdf216d6133ba0ee4a698d1f088e998c14601d
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

### (Start)

$> `npm run scripts` or `grunt`


## License

[MIT](LICENSE.md)
