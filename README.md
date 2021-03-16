# user-serverless
Serverless project that creates new user accounts

## Function
### Create User
<img src="./diagrams/icons/POST.svg" alt="drawing" height="17"/> **/dev/user**

```JAVA
--header 'Content-Type: application/json' \
--header 'Authorization: <Token>' \
--data-raw '{
    "name": "leand",
    "surname": "gutierrez",
    "email": "emanleand@gmail.com",
    "username": "emanleand"
}'
```
#### Response
```JSON
    "user": {
        "uuid": "f5be1540-21d4-11ea-8334-abb3920a73ca",
        "name": "name created"
    }

```
### Get User
<img src="./diagrams/icons/GET.svg" alt="drawing" height="17"/> **/dev/user/{uuid}**

```JAVA
--header 'Authorization: <Token>' \

```

#### Response
```JSON
    "response": {
        "Item":  [
            {
                "name": "name",
                "create_on": 1615832736,
                "user_status": "active",
                "id": "9689e142-2caa-48f4-a20e-e2dace828731",
                "email": "zsoled@gmail.com",
                "username": "javiersalom"
            }
        ]   
    }
```

### Remove User
<img src="./diagrams/icons/DELETE.svg" alt="drawing" height="17"/> **/dev/user/remove/{uuid}**

```JAVA
--header 'Authorization: <Token>' \

```

#### Response
```JSON
    "response": {
        "message": "Delete Ok"
    }

```

### Disable User
<img src="./diagrams/icons/PATCH.svg" alt="drawing" height="17"/> **/dev/user/disable/{uuid}**

```JAVA
--header 'Authorization: <Token>' \

```

#### Response
```JSON
    "response": {
        "message": "success"
    }

```