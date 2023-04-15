# GTFS Prisma

This repo is a node js project for uploading and maintaining a Postgres database with multiple transit gtfs files. This repo follows the config types that are specified in the [gtfs node repo](https://github.com/blinktaginc/node-gtfs), but are meant for postgres databases.

## Designing an agency config


### AgencyConfig

- id: A Unigue id associated with the gtfs file.
- name: A friendly name for your agency.
- timezone: The timezone of the agency.
- exclude: List of files to exclude from import.
- url: The url of the gtfs file that you are importing.
- route_exclusions: routes to exclude from import. This is an array of where queries against the routes table.


*** It is important to note that this does not support multiple agency gtfs


## Startup

This project has its own docker compose file so just run:

```
docker compose up
```

Then start in dev mode:

