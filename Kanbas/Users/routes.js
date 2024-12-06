// // import * as dao from "./dao.js";

// // let currentUser = null;
// // export default function UserRoutes(app) {
// //   const createUser = (req, res) => { };
// //   const deleteUser = (req, res) => { };
// //   const findAllUsers = (req, res) => { };
// //   const findUserById = (req, res) => { };
// //   const updateUser = (req, res) => { };
// //   const signup = (req, res) => { };
// //   const signin = (req, res) => { };
// //   const signout = (req, res) => { };
// //   const profile = (req, res) => { };
// //   app.post("/api/users", createUser);
// //   app.get("/api/users", findAllUsers);
// //   app.get("/api/users/:userId", findUserById);
// //   app.put("/api/users/:userId", updateUser);
// //   app.delete("/api/users/:userId", deleteUser);
// //   app.post("/api/users/signup", signup);
// //   app.post("/api/users/signin", signin);
// //   app.post("/api/users/signout", signout);
// //   app.post("/api/users/profile", profile);
// // }

// import * as dao from "./dao.js";
// let currentUser = null;

// export default function UserRoutes(app) {
//   const findAllUsers = async (req, res) => {
//     const { role, name } = req.query;
//     if (role) {
//       const users = await dao.findUsersByRole(role);
//       res.json(users);
//       return;
//     }
//     if (name) {
//       const users = await dao.findUsersByPartialName(name);
//       res.json(users);
//       return;
//     }

//     const users = await dao.findAllUsers();
//     res.json(users);
//   };

//   const signin = async (req, res) => {
//     const { username, password } = req.body;
//     try {
//       const currentUser = await dao.findUserByCredentials(username, password);
//       if (currentUser) {
//         req.session["currentUser"] = currentUser;
//         res.json(currentUser);
//       } else {
//         res.status(401).json({ message: "Unable to login. Try again later." });
//       }
//     } catch (error) {
//       res.status(500).json({ message: "An error occurred", error });
//     }
//   };

//   const signup = async (req, res) => {
//     try {
//       const user = await dao.findUserByUsername(req.body.username);
//       if (user) {
//         res.status(400).json({ message: "Username already taken" });
//         return;
//       }
//       const currentUser = await dao.createUser(req.body);
//       req.session["currentUser"] = currentUser;
//       res.json(currentUser);
//     } catch (error) {
//       res.status(500).json({ message: "An error occurred", error });
//     }
//   };

//   const profile = async (req, res) => {
//     try {
//       const currentUser = req.session["currentUser"];
//       if (currentUser) {
//         res.json(currentUser);
//       } else {
//         res.status(404).json({ message: "No profile found" });
//       }
//     } catch (error) {
//       res.status(500).json({ message: "An error occurred", error });
//     }
//   };

//   const signout = async (req, res) => {
//     try {
//       req.session.destroy((err) => {
//         if (err) {
//           res.status(500).json({ message: "Unable to sign out" });
//         } else {
//           res.sendStatus(200);
//         }
//       });
//     } catch (error) {
//       res.status(500).json({ message: "An error occurred", error });
//     }
//   };

//   const updateUser = async (req, res) => {
//     try {
//       const userId = req.params.id;
//       const updates = req.body;
//       const updatedUser = await dao.updateUser(userId, updates);
//       if (updatedUser) {
//         res.json(updatedUser);
//       } else {
//         res.status(404).json({ message: "User not found" });
//       }
//     } catch (error) {
//       res.status(500).json({ message: "An error occurred", error });
//     }
//   };

//   const findUserById = async (req, res) => {
//     try {
//       const userId = req.params.id;
//       const user = await dao.findUserById(userId);
//       if (user) {
//         res.json(user);
//       } else {
//         res.status(404).json({ message: "User not found" });
//       }
//     } catch (error) {
//       res.status(500).json({ message: "An error occurred", error });
//     }
//   };

//   // Routes
//   app.get("/api/users", findAllUsers);

//   app.post("/api/users/signin", signin);
//   app.post("/api/users/signup", signup);
//   app.get("/api/users/profile", profile);
//   app.post("/api/users/signout", signout);
//   app.put("/api/users/:id", updateUser);
//   app.get("/api/users/:id", findUserById);
// }

import * as dao from "./dao.js";

export default function UserRoutes(app) {
  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    try {
      if (role) {
        const users = await dao.findUsersByRole(role);
        res.json(users);
        return;
      }
      if (name) {
        const users = await dao.findUsersByPartialName(name);
        res.json(users);
        return;
      }
      const users = await dao.findAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error });
    }
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    try {
      const currentUser = await dao.findUserByCredentials(username, password);
      if (currentUser) {
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
      } else {
        res.status(401).json({ message: "Unable to login. Try again later." });
      }
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error });
    }
  };

  const signup = async (req, res) => {
    try {
      const user = await dao.findUserByUsername(req.body.username);
      if (user) {
        res.status(400).json({ message: "Username already taken" });
        return;
      }
      const currentUser = await dao.createUser(req.body);
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error });
    }
  };

  const profile = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (currentUser) {
        res.json(currentUser);
      } else {
        res.status(404).json({ message: "No profile found" });
      }
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error });
    }
  };

  const signout = async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          res.status(500).json({ message: "Unable to sign out" });
        } else {
          res.sendStatus(200);
        }
      });
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error });
    }
  };

  const updateUser = async (req, res) => {
    try {
      const { userId } = req.params; // Extract userId from the route parameter
      const userUpdates = req.body; // Extract updates from the request body

      // Call DAO function to update the user in the database
      const updatedUser = await dao.updateUser(userId, userUpdates);

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" }); // Respond with 404 if user not found
      }

      // Update the session if the updated user is the logged-in user
      const currentUser = req.session["currentUser"];
      if (currentUser && currentUser._id === userId) {
        req.session["currentUser"] = { ...currentUser, ...userUpdates };
      }

      res.json(updatedUser); // Respond with the updated user data
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error }); // Handle errors gracefully
    }
  };

  const findUserById = async (req, res) => {
    try {
      const userId = req.params.userId; // Retrieve userId from route parameter
      const user = await dao.findUserById(userId); // Fetch user from DAO
      if (user) {
        res.json(user); // Respond with user data
      } else {
        res.status(404).json({ message: "User not found" }); // 404 if user doesn't exist
      }
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error });
    }
  };

    const deleteUser = async (req, res) => {
      try {
        const userId = req.params.userId; // Retrieve the userId from the path parameter
        const status = await dao.deleteUser(userId); // Call DAO to delete the user
        if (status) {
          res.json({ message: `User with ID ${userId} deleted successfully.` }); // Respond with success message
        } else {
          res.status(404).json({ message: "User not found" }); // Respond with 404 if user not found
        }
      } catch (error) {
        res.status(500).json({ message: "An error occurred", error }); // Handle errors gracefully
      }
    };

    const createUser = async (req, res) => {
      const user = await dao.createUser(req.body);
      res.json(user);
    };
  

  // Routes
  app.get("/api/users", findAllUsers);          // Retrieve all users or filter by query
  app.get("/api/users/:userId", findUserById);  // Retrieve user by ID
  app.post("/api/users/signin", signin);        // Sign in user
  app.post("/api/users/signup", signup);        // Sign up user
  app.get("/api/users/profile", profile);       // Get the current user's profile
  app.post("/api/users/signout", signout);      // Sign out user
  app.put("/api/users/:userId", updateUser);    // Update a user
  app.delete("/api/users/:userId", deleteUser); // Delete a user
  app.post("/api/users", createUser);
}
