const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.createTicket = async (req, res) => {
    try {
        const { name, projectId, teamId, assigneeId, startDate, dueDate, priorityId, statusId, description } = req.body

        // Get the teamId based on abbreviation
        const team = await prisma.team.findFirst({
            where: {
                id: teamId,
            },
        });

        if (!team) {
            return res.status(404).json({ error: "No team found with this abbreviation" });
        }

        // Get the project based on projectId
        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
                teamId: teamId,
            },
        })

        if (!project) {
            return res.status(404).json({ error: "No project found with these parameters" })
        }

        // Check if the user is part of the project's team
        const userTeam = await prisma.userTeam.findUnique({
            where: {
                userId_teamId: {
                    userId: req.user.id,
                    teamId: project.teamId,
                },
            },
        })

        if (!userTeam) {
            return res.status(403).json({ error: "User is not part of this team" })
        }

        // Find the maximum identifier used so far and increment it by 1 for the new ticket
        const lastTicket = await prisma.ticket.findFirst({
            where: {
                projectId: projectId,
            },
            orderBy: {
                identifier: 'desc',
            },
            select: {
                identifier: true
            }
        });
        
        // If there are no tickets, the identifier for the new ticket would be 1. Otherwise, increment the identifier of the last ticket.
        const identifier = lastTicket ? lastTicket.identifier + 1 : 1;        

        const newTicket = await prisma.ticket.create({
            data: {
                name: name,
                projectId: projectId,
                assigneeId: assigneeId,
                identifier: identifier,
                startDate: startDate,
                dueDate: dueDate,
                priorityId: priorityId,
                statusId: statusId,
                description: description,
            },
        })

        res.status(201).json(newTicket)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
