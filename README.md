# Blog It Up

---

## INTRODUCTION

- This is a backend module for adding posts, like post and comment on a post.
- User can register themselves and view the posts or they can add their own posts.
- They can also like a post and comment on a post.

## TECHNOLOGIES USED

- Node JS,Express JS and Mongo DB as the backend.

## REQUIREMENTS

- Download and install MongoDB in your system and set the environment variables.
- Download MongoDB Compass.
- Open your command prompt and run the command `mongod`.
- MongoDB server will be running after executing the command.
- Download the code or clone it into your system.
- Run `npm i` to download all required node modules.
- At last run `node index.js`.
- If node is not installed in your system install it.
- The `post` routes of post, like and comment modules should be provided with authentication token in the header of the request.

## API ENDPOINTS

1. There are actually seven modules.
   - User
   - Post
   - Like
   - Comment

### USER

| METHOD | ROUTE                                          |
| ------ | ---------------------------------------------- |
| GET    | `http://localhost:{PortNumber}/users`          |
| GET    | `http://localhost:{PortNumber}/users/{userID}` |
| POST   | `http://localhost:{PortNumber}/users`          |
| PUT    | `http://localhost:{PortNumber}/users/{userID}` |

### POST

| METHOD | ROUTE                                          |
| ------ | ---------------------------------------------- |
| GET    | `http://localhost:{PortNumber}/posts`          |
| GET    | `http://localhost:{PortNumber}/posts/{postID}` |
| POST   | `http://localhost:{PortNumber}/posts/{userId}` |
| PUT    | `http://localhost:{PortNumber}/posts/{postID}` |

### LIKE

| METHOD | ROUTE                                          |
| ------ | ---------------------------------------------- |
| GET    | `http://localhost:{PortNumber}/likes`          |
| POST   | `http://localhost:{PortNumber}/likes/{userID}` |

### COMMENT

| METHOD | ROUTE                                             |
| ------ | ------------------------------------------------- |
| GET    | `http://localhost:{PortNumber}/comments/{userID}` |
| POST   | `http://localhost:{PortNumber}/comments/{userID}` |

## LICENSE & COPYRIGHT

© Jagapradeep G
