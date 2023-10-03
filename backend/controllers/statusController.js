const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.getAllStatuses = async (req, res) => {
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

        const statuses = await prisma.status.findMany({
            where: {
                teamId: teamId,
            },
            where: {
                isCustom: false,
            },
        })

        if (!statuses) {
            return res
                .status(404)
                .json({ error: "No statuses found for this team" })
        }

        res.status(200).json(statuses)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
