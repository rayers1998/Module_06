Rene Ayers
Module 6: Full-Stack-Development-1
MONGO_URI=mongodb+srv://rayers1998:Ivy2020!@cluster0.24bfftf.mongodb.net/Module_5?retryWrites=true&w=majority&appName=Cluster0C
PORT=3004
JWT_SECRET=jsonwebtoken
ENV_NAME=local

 #### Dependencies
    "bcrypt": "^5.1.1",
    "chalk": "^5.3.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.19.2",
    "express-validator": "^7.1.0",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^6.8.0",
    "mongoose": "^6.9.1",
    "sinon": "^15.0.1",
    "validator": "^13.12.0"
  
  #### devDependencies
    "chai": "^4.3.7",
    "chai-http": "^4.3.0",
    "mocha": "^10.2.0",
    "nodemon": "^2.0.20"

TECH WE WILL BE USING FOR TESTING
-Mocha JS - A framework
-Chai - A library
-Sinon JS - Tool to mock external calls

In Module 6, UNIT TESTING is key part of our testing strategy. UNIT TESTING is software testing that evaluate different aspects of an application. UNIT TESTING tests individual parts of an application separately. It's a method where developers check each part of the code to ensure it works correctly. This type of testing involves looking at the actual code. Upon researching, I've summarized below why UNIT TESTING is more important than other types of testing.

QUICK FEEDBACK Unit tests give immediate feedback on code changes, helping developers find and fix errors early in the development process. This makes coding faster and reduces the time spent on debugging and manual testing.

EASIER CODE CHANGES With a set of unit tests, developers can confidently change code, knowing that any mistakes will be quickly found. This encourages improving the codebase, leading to cleaner and more manageable code.

BETTER CODE QUALITY Unit testing makes developers think about different scenarios and potential errors early on, resulting in more robust and error-free code. By writing tests that cover a variety of inputs and situations, we ensure our components work correctly in different conditions.

SUPPORTS CONTINUOUS INTEGRATION (CI) Unit tests are essential for Continuous Integration (CI). They run automatically whenever code is added to the version control system, ensuring new changes don’t cause problems. This automation allows for quicker development and more frequent releases.

WHY UNIT TESTING FIRST? While other types of testing like integration, system, and end-to-end testing are also important, focusing on unit testing helps us build a strong and reliable foundation for our application. By making sure the smallest parts work correctly, we make it easier for higher-level tests to run smoothly. Unit tests are also quicker to write and run, making them a cost-effective way to catch bugs early.

As our application grows, we will continue to use other types of testing to ensure everything works well together. But starting with unit testing helps us ensure quality and reliability from the beginning.

Other Testing Strategies
Integration Testing
Integration testing checks how different parts of the application work together. This type of testing:

Ensures smaller components interact properly.
Considers side effects from the start.
Improves performance and scalability.
Provides a user-friendly interface.
Integration testing is a black box testing method, meaning it doesn't require looking at the actual code. It usually comes after unit testing is complete.

Functional Testing
Functional testing examines the entire application to ensure it behaves as expected. This testing:

Validates and verifies all functionalities.
Ensures the application works correctly as a whole.
Functional testing typically starts after unit testing and integration testing are complete.
