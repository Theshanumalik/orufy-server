# Orufy Backend

Backend API for Orufy, a product management platform that allows users to create, manage, publish, and organize products with image uploads and OTP-based authentication.

## Features

* OTP-based Authentication
* Product CRUD Operations
* Product Publishing / Unpublishing
* Cloudinary Image Uploads
* MongoDB Database Integration
* JWT Authentication
* Protected Routes
* Zod Request Validation
* Global Error Handling
* Cookie-based Authentication

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Zod
* JWT
* Cloudinary
* Multer
* Cookie Parser

## Environment Variables

Create a `.env` file in the project root.

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string

JWT_TOKEN=your_jwt_secret

CLOUDINARY_CLOUD_NAME=<your_cloudinary_name>
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Installation

```bash
git clone https://github.com/Theshanumalik/orufy-server.git

cd server

pnpm install
```

## Running Locally

```bash
pnpm dev
```

or

```bash
pnpm start
```

## API Endpoints

### Authentication

#### Create User

```http
POST /api/users
```

#### Generate OTP

```http
POST /api/users/generateOTP
```

#### Verify OTP

```http
POST /api/users/verifyOTP
```

#### Get Current User

```http
GET /api/users/user
```

#### Logout

```http
POST /api/users/logout
```

---

### Products

#### Get All Products

```http
GET /api/products
```

Query Parameters:

```txt
?filter=published
?filter=unpublished
```

#### Get Product By Id

```http
GET /api/products/:id
```

#### Create Product

```http
POST /api/products
```

#### Update Product

```http
PUT /api/products/:id
```

#### Delete Product

```http
DELETE /api/products/:id
```

#### Publish / Unpublish Product

```http
PATCH /api/products/:id/publish
```

---

### Uploads

#### Upload Images

```http
POST /api/upload
```

Content-Type:

```txt
multipart/form-data
```

Field Name:

```txt
images
```

Supports multiple image uploads in a single request.

## Project Structure

```txt
src
├── controllers
├── middlewares
├── models
├── routes
├── schemas
├── lib
├── utils
└── index.js
```

## Authentication Flow

1. User creates an account.
2. User requests an OTP.
3. OTP is verified.
4. JWT token is stored in an HTTP-only cookie.
5. Protected routes use the authentication middleware to identify the user.

## Deployment

### Backend

* AWS EC2
* PM2
* Nginx

### Media Storage

* Cloudinary

### Database

* MongoDB Atlas

## License

MIT

