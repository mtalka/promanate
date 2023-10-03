const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.createTeam = async (req, res) => {
    try {
        const { name, abbreviation } = req.body

        const newTeam = await prisma.team.create({
            data: {
                name: name,
                abbreviation: abbreviation,
            },
        })

        const userTeam = await prisma.userTeam.create({
            data: {
                userId: req.user.id,
                teamId: newTeam.id,
            },
        })

        res.status(201).json({ team: newTeam, userTeam: userTeam })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
