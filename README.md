# portal-to-work-api

## Prerequisites

- Node 16 or greater
- npm 8 or greater
- PostgreSQL 14
- Redis

## Environment Settup

- Clone the repo locally: `git clone git@github.com:Open-SGF/portal-to-work-api.git`
- Change to the directory: `cd portal-to-work-api`
- Install the dependencies: `npm install`
- Create a .env file from the template: `cp .env.example .env`
- Create a PostgreSQL database.
- Add your database details to the .env file.
- Run the database migrations: `npm run typeorm migration:run`
- Initialize the server: `npm run dev`
- Acquire API Keys from a teammate.

## Contributing

Read our [Contributing Guide](CONTRIBUTING.md)

