const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.signupUser = async (req, res) => {
    try {
        // Check if req.user exists (this should be set by your Auth0 middleware)
        if (!req.user) {
            return res.status(404).json({ error: "User not authenticated" })
        }

        // Find the user in the database
        let user = await prisma.user.findUnique({
            where: { auth0Id: req.user.sub },
        })

        // If the user doesn't exist, create them
        if (!user) {
            user = await prisma.user.create({
                data: {
                    auth0Id: req.user.sub,
                    name: req.user.name,
                    email: req.user.email,
                    // Other user data from req.user or req.body
                },
            })
        }

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const { teamId, projectId } = req.params

        // Get the teamId based on abbreviation
        const team = await prisma.team.findFirst({
            where: {
                id: teamId,
            },
        })

        if (!team) {
            return res
                .status(404)
                .json({ error: "No team found with this abbreviation" })
        }

        // Check if the user is part of the team
        const userTeam = await prisma.userTeam.findFirst({
            where: {
                userId: req.user.id,
                teamId: teamId,
            },
        })

        if (!userTeam) {
            return res
                .status(403)
                .json({ error: "User is not part of this team" })
        }

        const users = await prisma.user.findMany({
            where: { UserTeam: { some: { teamId: teamId } } },
        })

        if (!users.length) {
            return res
                .status(404)
                .json({ error: "No users found for this project" })
        }

        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.params.id },
        })
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.createUser = async (req, res) => {
    try {
        const newUser = await prisma.user.create({ data: req.body })
        res.status(201).json(newUser)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: req.params.id },
            data: req.body,
        })
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await prisma.user.delete({ where: { id: req.params.id } })
        res.status(204).json({ message: "User deleted" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
