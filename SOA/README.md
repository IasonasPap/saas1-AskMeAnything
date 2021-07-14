### SOA Architecture

How to set up and run the project :

1. Replace the node_modules/react-scripts/config/path.js with the path.js file given

On Window:

2. Run the Enterprise Service Buss
    run the 'redis-server.exe' file (if you haven't download it yet go to https://redis.io/download)
    ```node backend\'ESB'\server.js```

3. Run the Authenticator Service
    ```node backend\'Authenticator Service'\server.js```

4. Run the Statistics Service
    ```node backend\'Statistics Service'\server.js```

5. Run the Questions-Answers Management Service
    ``node backend\'Questions-Answers Management Service'\server.js```

6. Run the front end
    ```npm start```

On Linux:

2. Run the Enterprise Service Buss
    ```sudo add-apt-repository ppa:redislabs/redis
    sudo apt-get update
    sudo apt-get install redis
    node backend/'ESB'/server.js```

3. Run the Authenticator Service
    ```node backend/'Authenticator Service'/server.js```

4. Run the Statistics Service
    ```node backend/'Statistics Service'/server.js```

5. Run the Questions-Answers Management Service
    ``node backend/'Questions-Answers Management Service'/server.js```

6. Run the front end
    ```npm start```
