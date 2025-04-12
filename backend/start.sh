#!/bin/bash

/wait-for-it.sh db:5432 --timeout=30 --strict -- echo "DB up and running"

npx prisma migrate deploy --schema=./prisma/schema.prisma

npx prisma generate --schema=./prisma/schema.prisma

npx prisma migrate dev --name create_event_table

npx prisma migrate deploy

npm run start
