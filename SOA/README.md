### SOA Architecture

How to set up and run the project :

1. Replace the node_modules/react-scripts/config/path.js with the path.js file given

2. Run the Enterprise Service Buss
    run the 'redis-server.exe' file (if you haven't download it yet go to https://redis.io/download)

3. Run the Authenticator Service
    node backend\'Authenticator Service'\server.js

4. Run the Statistics Service
    node backend\'Statistics Service'\server.js

5. Run the Questions-Answers Management Service
    node backend\'Questions-Answers Management Service'\server.js

6. Run the front end
    npm start





### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
