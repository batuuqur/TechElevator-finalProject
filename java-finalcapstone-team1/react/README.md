# Final Capstone React Project Starter
​
This is the React starter project for the final capstone. This document walks you through how to set up and run the project. It also explains the project's features, such as React Router and authentication.
​
## Project setup
​
The first thing you'll need to do is to download any dependencies by running this command:
​
```
npm install
```
​
Next take a moment to review the `.env` file that's located in the root of the project. You can store environment variables that you want to use throughout your application in this file. When you open it, it'll look like this:
​
```
VITE_REMOTE_API=http://localhost:9000
```
​
*Note:* the Java Spring Boot application is configured to run on port `9000` instead of `8080`.
​
Start your React application with the following command:
​
```
npm run dev
```

## Application styling

The application includes two global CSS files—`public/css/global.css` and `public/css/reset.css`—that provide some basic styling to give you a starting point. You're free to change and modify these files to style the application how you want.
​
## Authentication
​
When you first run the project and visit the base URL, you're taken to the home page at the route `/`. There's a side nav with a link to the login page. From there you can login (see the server instructions for default credentials) or register a new user.

Once you log in, the nav changes to have links to "Profile" (a protected route) and logout. The route for "Profile" uses the `<ProtectedRoute>` component to verify there's a logged-in user before rendering the content.

The authentications features work as you've seen in the curriculum already:

* `src/context/UserContext.jsx` is the user data context for providing user data to other components
* In `src/App.jsx`:
  * There are two functions to manage the logging in and logging out—`handleLogin()` and `handleLogout()`
  * The `useEffect` Hook retrieves the stored user and token from `localStorage` when the user returns the to page
  * The `<UserContext.Provider>` surrounds most of the application code to provide the user context to any component that requests it

