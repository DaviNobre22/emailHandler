# Async Email API with BullMQ

High-performance asynchronous API built with Bun, ElysiaJS, BullMQ, Redis, and Nodemailer.

## Architecture

- **API Server** (`index.ts`): Validates requests and queues email jobs, returns immediately (202 Accepted)
- **Worker** (`worker.ts`): Processes queued jobs asynchronously and sends emails via Nodemailer
- **Redis**: Message broker and queue backend
- **BullMQ**: Reliable job queue with retry logic

## Project Structure

```
async-email-api/
├── index.ts                    # Main API entry point
├── worker.ts                   # Background worker process
├── config/
│   ├── env.ts                 # Environment variables configuration
│   ├── redis.ts               # Redis client configuration
│   └── queue.ts               # BullMQ queue setup
├── middlewares/
│   ├── auth.ts                # Bearer token authentication
│   └── error-handler.ts       # Global error handling
├── routes/
│   ├── email.ts               # Email endpoints
│   └── health.ts              # Health check endpoint
├── services/
│   └── email-service.ts       # Email sending logic
├── types/
│   └── index.ts               # TypeScript type definitions
├── package.json
├── .env
└── docker-compose.yml
```

## Prerequisites

- Bun installed
- Redis server running

## Code Organization Benefits

### Config Layer (`config/`)
- **`env.ts`**: Centralized environment variable management
- **`redis.ts`**: Single Redis connection shared across the app
- **`queue.ts`**: Queue configuration and type definitions in one place

### Middleware Layer (`middlewares/`)
- **`auth.ts`**: Reusable authentication logic
- **`error-handler.ts`**: Consistent error responses

### Routes Layer (`routes/`)
- **`email.ts`**: Email-related endpoints
- **`health.ts`**: Monitoring endpoints
- Easy to add new route groups

### Services Layer (`services/`)
- **`email-service.ts`**: Business logic for email sending
- Testable and reusable across different contexts

### Types Layer (`types/`)
- **`index.ts`**: Shared TypeScript interfaces
- Better IDE autocomplete and type safety

## Key Features

- **Clean Architecture**: Well-organized code structure
- **Non-blocking API**: Immediate 202 response after queueing
- **Bearer token authentication**: Simple but effective security
- **Validation**: Email format and field length validation
- **Error handling**: Comprehensive error responses
- **Rate limiting**: Worker rate limits (10 jobs/second)
- **Concurrency**: Process 5 jobs simultaneously
- **Health endpoint**: Monitor queue and Redis status
- **Retry logic**: BullMQ automatic retry on failures
- **Type safety**: Full TypeScript support

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | No | API info |
| GET | `/health` | No | Health check |
| POST | `/api/send-email` | Yes | Queue email |
