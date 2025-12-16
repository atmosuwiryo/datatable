# Gemini Workspace

This workspace contains a datatable application.

## Getting Started

1. Run `pnpm install` to install dependencies.
2. Run `pnpm nx serve datatable` to serve the frontend application.
3. Run `pnpm nx serve datatable-api` to serve the backend application.

## Available Scripts

- `build:workspace`: Build the entire workspace.
- `env:init`: Initialize the environment by copying `.env.example` to `.env`.
- `prisma:generate`: Generate Prisma client.
- `prisma:reset`: Reset the database.
- `prisma:reset:local`: Initialize the environment and reset the database.
- `build:datatable-api`: Build the datatable-api application.
- `build:datatable-api:local`: Initialize the environment and build the datatable-api application.
- `build:datatable`: Build the datatable application.
- `build`: Build both the datatable-api and datatable applications.
- `serve:datatable-api`: Serve the datatable-api application.
- `serve:datatable-api:local`: Initialize the environment and serve the datatable-api application.
- `serve:datatable`: Serve the datatable application.
- `serve:datatable:local`: Initialize the environment and serve the datatable application.
