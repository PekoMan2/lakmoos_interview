#!/bin/bash

curl -X POST http://localhost:3000/events -H "Content-Type: application/json" -d '{"name": "Ahoj1", "description": "This is a test event", "from": "2025-04-10T10:00:00Z", "to": "2025-04-10T12:00:00Z"}'

curl -X POST http://localhost:3000/events -H "Content-Type: application/json" -d '{"name": "joha", "description": "This is a test event", "from": "2025-04-10T10:00:00Z", "to": "2025-04-10T12:00:00Z"}'

curl -X POST http://localhost:3000/events -H "Content-Type: application/json" -d '{"name": "hovno", "description": "This is a test event", "from": "2025-04-10T10:00:00Z", "to": "2025-04-10T12:00:00Z"}'

curl -X POST http://localhost:3000/events -H "Content-Type: application/json" -d '{"name": "Auto", "description": "This is a test event", "from": "2025-04-10T10:00:00Z", "to": "2025-04-10T12:00:00Z"}'

curl -X POST http://localhost:3000/events -H "Content-Type: application/json" -d '{"name": "Slapka", "description": "This is a test event", "from": "2025-04-10T10:00:00Z", "to": "2025-04-10T12:00:00Z"}'

curl -X POST http://localhost:3000/events -H "Content-Type: application/json" -d '{"name": "Nozik", "description": "This is a test event", "from": "2025-04-10T10:00:00Z", "to": "2025-04-10T12:00:00Z"}'