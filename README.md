The database connection string 

"mongodb://root:root@localhost:27017/test-thco?&authSource=admin"
The database connection string value we will use in the MongoDB Compass app:

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













