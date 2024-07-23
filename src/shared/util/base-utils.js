// src\shared\util\base-utils.js

// The base-utilis file handle async functions
// Asynch operations uses "await" and promises. The "await" keyword is used inside an async function to pause execution until the returned promise is fulfilled or rejected.


const asyncWrapper = (fn) => {
    
    return async (req, res, next) => { // Return an asynchronous function that takes req, res, and next as arguments
        try {           
            await fn(req, res, next); // Await the execution of the passed function with req, res, and next
        } catch (error) {           
            next(error);  // If an error occurs, pass it to the next middleware
        }
    };
};

module.exports = asyncWrapper;