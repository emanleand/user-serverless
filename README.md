# user-serverless
Serverless project that creates new user accounts

## Function
<img src="./diagrams/icons/POST.svg" alt="drawing" height="17"/> **/dev/user**

```JAVA
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "leand",
    "surname": "gutierrez",
    "email": "emanleand@gmail.com",
    "username": "emanleand"
}'
```

<img src="./diagrams/icons/GET.svg" alt="drawing" height="17"/> **/dev/user/{uuid}**

<img src="./diagrams/icons/DELETE.svg" alt="drawing" height="17"/> **/dev/user/remove/{uuid}**

<img src="./diagrams/icons/PATCH.svg" alt="drawing" height="17"/> **/dev/user/disable/{uuid}**
