# MySQL-API
Access your MySQL server easily with an API over https
## Dependencies
- [npm](https://npmjs.com)
- [mysql](https://www.mysql.com)
## Usage
```bash
# First clone this repository
git clone https://github.com/Alphinux/MySQL-API
# Then enter it
cd MySQL-API
# Install dependencies
npm install
```

Create a `.env` file and add these lines:
```dosini
MYSQL_HOST=<host> (most often localhost)
MYSQL_USERNAME=<user>
MYSQL_PASSWORD=<password>
API_PORT=<port> (default is 3333)
```
If you want to add your own api key add this line: `API_KEY=<key>`, else there's going to be a key generated for you.

To start the server run `npm run server`
## API
You'll now have an api listening on port `3333`.
