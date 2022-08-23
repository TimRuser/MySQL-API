# MySQL-API
Access your MySQL server easily with an API over https
## Dependencies
- [npm](https://npmjs.com)
- [mysql](https://www.mysql.com)

If you get this error:
```node
Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
```
Run this query in MySQL Workbench:
`ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';`

Where `root` as your user `localhost` as your URL and `password` as your password

Then run this query to refresh privileges:

`flush privileges;`
## Usage
```bash
# First clone this repository
$ git clone https://github.com/Alphinux/MySQL-API
# Then enter it
$ cd MySQL-API
# Install dependencies
$ npm install
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
The URI is `/api`

## Setting up a reverse proxy for https
You'll first need to set up an A record for your domain.
```bash
# Then you can copy the default server block file
$ cp /etc/nginx/sites-available/defaul /etc/nginx/sites-available/example.com
# Make sure your user owns the directory
$ sudo chown -R $USER:$USER /var/www/example.com/html
$ sudo chmod -R 755 /var/www/example.com
```
Edit it:
```config
server {
        listen 80;
        listen [::]:80;

        server_name example.com www.example.com

        location / {
                proxy_pass http://<ip>:<port>
        }

}
```
```bash
# Create symlink
$ sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
# Check configuration
$ sudo nginx -t
# Restart nginx
$ sudo systemctl restart Nginx
```
We will now create and configure the certificate. You'll need to have [certbot](https://certbot.eff.org/) installed.
```bash
# Make certbot automatiacally create and configure your certificate
sudo certbot --nginx
# When prompted select the correct domain
```
$ sudo certbot --nginx
```
