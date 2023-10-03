const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.getAllPriorities = async (req, res) => {
    const { teamId } = req.params;
    const userId = req.user.id

    try {
        // Get the teamId based on abbreviation
        const team = await prisma.team.findFirst({
            where: {
                id: teamId,
            },
        })

        if (!team) {
            return res.status(404).json({ error: "No team found with this id" })
        }

        // Check if user is part of the team
        const userTeam = await prisma.userTeam.findUnique({
            where: {
                userId_teamId: {
                    userId: userId,
                    teamId: teamId,
                },
            },
        })

        if (!userTeam) {
            return res
                .status(403)
                .json({ error: "User is not part of this team" })
        }

        const priorities = await prisma.priority.findMany({
            where: {
                teamId: teamId,
            },
            where: {
                isCustom: false,
            },
        })

        if (!priorities) {
            return res
                .status(404)
                .json({ error: "No priorities found for this team" })
        }

        res.status(200).json(priorities)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
