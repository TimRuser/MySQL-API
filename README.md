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
API_PORT=<port>
MYSQL_HOST=<host> (most often localhost)
MYSQL_USERNAME=<user>
MYSQL_PASSWORD=<password>
```

To start the server run `npm run server`
