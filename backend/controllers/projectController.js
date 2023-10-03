const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.createProject = async (req, res) => {
    try {
        const userId = req.user.id
        const { name, abbreviation, teamId } = req.body

        // Get the teamId based on abbreviation
        const team = await prisma.team.findFirst({
            where: {
                id: teamId,
            },
        });

        if (!team) {
            return res.status(404).json({ error: "No team found with this abbreviation" });
        }

        // Check if user is part of the team
        const userTeam = await prisma.userTeam.findUnique({
            where: {
                userId_teamId: {
                    userId: userId,
                    teamId: teamId,
                },
            },
        });

        if (!userTeam) {
            return res.status(403).json({ error: "User is not part of this team" });
        }

        const newProject = await prisma.project.create({
            data: {
                name: name,
                abbreviation: abbreviation,
                teamId: teamId,
            },
        })

        res.status(201).json(newProject)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
