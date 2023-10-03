const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.getUserInitial = async (req, res) => {
    try {
        console.log("getUserInitial req user", req.user)
        // Check if req.user exists
        if (!req.user) {
            return res.status(404).json({ error: "User not authenticated" })
        }

        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                defaultTeamId: true,
                UserTeam: {
                    select: {
                        teamId: true,
                        team: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        })

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getTeamsInitial = async (req, res) => {
    try {
        // Check if req.user exists
        if (!req.user) {
            return res.status(404).json({ error: "User not authenticated" })
        }
        const teams = await prisma.team.findMany({
            where: {
                UserTeam: {
                    some: {
                        userId: req.user.id,
                    },
                },
            },
        })

        if (!teams) {
            return res.status(404).json({ error: "No teams found" })
        }

        res.status(200).json(teams)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getProjectsInitial = async (req, res) => {
    const teamId = req.query.teamId; 
    const userId = req.user.id; 

    try {
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

        const projects = await prisma.project.findMany({
            where: {
                teamId: teamId,
            },
        });

        if (!projects) {
            return res.status(404).json({ error: "No projects found for this team" });
        }

        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTicketsForProject = async (req, res) => {
    try {
        const { teamId, projectId } = req.params;

        // Get the teamId based on abbreviation
        const team = await prisma.team.findFirst({
            where: {
                id: teamId,
            },
        });

        if (!team) {
            return res.status(404).json({ error: "No team found with this abbreviation" });
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

        // Get the projectId based on abbreviation
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                teamId: teamId,
            },
        });

        if (!project) {
            return res.status(404).json({ error: "No project found with this abbreviation in the team" });
        }

        const tickets = await prisma.ticket.findMany({
            where: { projectId: projectId },
            include: {
                project: true,
                assignee: true,
                priority: true,
                status: true,
            },
        });

        if (!tickets.length) {
            return res
                .status(404)
                .json({ error: "No tickets found for this project" })
        }

        res.status(200).json(tickets);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


exports.getTicketById = async (req, res) => {
    try {
        const { teamId, projectId, ticketId } = req.params

        // Get the teamId based on abbreviation
        const team = await prisma.team.findFirst({
            where: {
                id: teamId,
            },
        });

        if (!team) {
            return res.status(404).json({ error: "No team found with this abbreviation" });
        }

        // Get the projectId based on abbreviation
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                teamId: teamId,
            },
        });

        if (!project) {
            return res.status(404).json({ error: "No project found with this abbreviation in the team" });
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

        const ticket = await prisma.ticket.findUnique({
            where: { 
                projectId: projectId,
                id: ticketId
            },
            include: {
                project: true,
                // assignee: true,
                // priority: true,
                // status: true,
            },
        })

        if (!ticket) {
            return res
                .status(404)
                .json({ error: "No ticket found with this identifier in the project" })
        }

        res.status(200).json(ticket)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

