
# portal-to-work-api

## Prerequisites

- Node 16.x.x
- npm 8.x.x
- PostgreSQL 13 or 14
- Redis

## Environment Settup

- Clone the repo locally: `git clone git@github.com:Open-SGF/portal-to-work-api.git`
- Change to the directory: `cd portal-to-work-api`
- Install the dependencies: `npm install`
- Create a .env file from the template: `cp .env.example .env`
- Create a PostgreSQL database.
- Add your database details to the `.env` file.
- Create a secret key and use it to set the `APP_SECRET_KEY` variable in `.env`
  - You can generate this value using the executing this command in your terminal
  - `node -e 'console.log(crypto.randomBytes(48).toString("hex"));`
- Set the `GOOGLE_RECAPTCHA_SECRET_KEY` in `.env`
  - For testing, you can use the built-in recaptcha test key `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe`
- Run the database migrations: `npm run typeorm migration:run`
- Initialize the server: `npm run dev`
- Acquire API Keys from a teammate.

## Contributing

Read our [Contributing Guide](CONTRIBUTING.md)

