const express = require("express")
const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

const cors = require("cors")
app.use(cors())

const helmet = require("helmet")
app.use(helmet())

const { auth } = require("express-oauth2-jwt-bearer")

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
    audience: "https://makke.eu.auth0.com/api/v2/",
    issuerBaseURL: `https://makke.eu.auth0.com/`,
})

app.use(checkJwt) // Use checkJwt middleware for all routes

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function getUserFromDatabase(auth0Id) {
    console.log("auth0Id: ", auth0Id)
    console.log(prisma.user)
    try {
        return await prisma.user.findUnique({
            where: { auth0Id },
        })
    } catch (err) {
        console.error(err)
        return null
    }
}

// Middleware for setting req.user based on JWT
app.use(async (req, res, next) => {
    if (req.auth && req.auth.payload && req.auth.payload.sub) {
        let user = await getUserFromDatabase(req.auth.payload.sub)
        // If the user doesn't exist in the database, create them
        if (!user) {
            user = await prisma.user.create({
                data: {
                    auth0Id: req.auth.payload.sub,
                    // Additional user properties can be included here
                    // You would typically get these from req.auth.payload,
                    // but the exact properties available will depend on your Auth0 configuration
                    name: req.auth.payload.name ? req.auth.payload.name : "",
                    email: req.auth.payload.email ? req.auth.payload.email : "",
                }
            });
        }
        // Assign the user to req.user
        req.user = user;
    }
    next();
});

const initController = require("./controllers/initController")
const teamController = require("./controllers/teamController")
const projectController = require("./controllers/projectController")
const ticketController = require("./controllers/ticketController")
const statuscontroller = require("./controllers/statusController")
const priorityController = require("./controllers/priorityController")
const userController = require("./controllers/userController")

// Get routes
app.get("/api/user/initial", initController.getUserInitial)
app.get("/api/teams/", initController.getTeamsInitial)
app.get("/api/projects/", initController.getProjectsInitial)
app.get("/api/tickets/:teamId/:projectId", initController.getTicketsForProject)
app.get("/api/tickets/:teamId/:projectId/:ticketId", initController.getTicketById)
app.get("/api/statuses/:teamId", statuscontroller.getAllStatuses)
app.get("/api/priorities/:teamId", priorityController.getAllPriorities)
app.get("/api/users/:teamId", userController.getAllUsers)
// Post routes
app.post("/api/teams/", teamController.createTeam)
app.post("/api/projects", projectController.createProject)
app.post("/api/tickets", ticketController.createTicket)


app.get("/", (req, res) => {
    res.send("No route defined")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
