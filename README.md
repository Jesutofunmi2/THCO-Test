THCO TEST FOR BACKEND: NODE EXPRESS MONGODB TYPESCRIPT

The database connection string 

"mongodb://root:root@localhost:27017/test-thco?&authSource=admin"


The database connection string value MongoDB Compass app:

mongodb://root:root@localhost:27017/

run:
docker compose up -d 

run:
npm run ourserver   


BaseUrl 
http://localhost:3000/api/v1/

login: post request

http://localhost:3000/api/v1/auth/login

Payload : email, password 

register: post request

http://localhost:3000/api/v1/auth/register

Payload: username, email, password

Get All users get request

http://localhost:3000/api/v1/users

Delete user delete request

http://localhost:3000/api/v1/users/:id

Update user patch request

http://localhost:3000/api/v1/users/:id

Post 

http://localhost:3000/api/v1/posts/:userId

Payload :  text, media

Get Feed get request

http://localhost:3000/api/v1/posts/:id


Like and Comment 

http://localhost:3000/api/v1/like/:userId   post request

Payload : postId

http://localhost:3000/api/v1/comment/:userId  post request

Payload: postId, text

http://localhost:3000/api/v1/likes/count/:postId get request

http://localhost:3000/api/v1//comments/count/:postId get request


Middlewares is also important as well

make sure you are authorize and authenticated

 isAuthenticated, isOwner














