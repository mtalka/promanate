import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    // Create a user
    const user = await prisma.user.create({
        data: {
            name: "Makke J. Talka",
            email: "markus.talka@columbiaroad.com",
            auth0Id: "auth0|64bd07c90b7eb7c579721c0e",
        },
    });

    // Create a team
    const team = await prisma.team.create({
        data: {
            name: "Makke's team",
        },
    });

    // Create a UserTeam relation
    const userTeam = await prisma.userTeam.create({
        data: {
            userId: user.id,
            teamId: team.id,
        },
    });

    // Create a priority
    const priority = await prisma.priority.create({
        data: {
            name: "Low",
            teamId: team.id,
            isCustom: false
        },
    });

    // Create a status
    const status = await prisma.status.create({
        data: {
            name: "To Do",
            teamId: team.id,
            isCustom: false
        },
    });

    // Create basic and custom priorities
    const priorities = await prisma.priority.createMany({
        data: [
            { name: "medium", isCustom: false },
            { name: "high", isCustom: false },
            { name: "Team 1 custom priority", isCustom: true, teamId: team.id },
        ],
    });

    // Create basic and custom statuses
    const statuses = await prisma.status.createMany({
        data: [
            { name: "in progress", isCustom: false },
            { name: "done", isCustom: false },
            { name: "discarded", isCustom: false },
            { name: "Team 1 custom status", isCustom: true, teamId: team.id },
        ],
    });

    // Create a project
    const project = await prisma.project.create({
        data: {
            name: "Project 1",
            teamId: team.id,
        },
    });

    // Create another project
    const project2 = await prisma.project.create({
        data: {
            name: "Project 2",
            teamId: team.id,
        },
    });

    // Create a ticket
    const ticket = await prisma.ticket.create({
        data: {
            name: "Ticket 1",
            projectId: project.id,
            priorityId: priority.id,
            statusId: status.id,
        },
    });

    // Create a second ticket
    const ticket2 = await prisma.ticket.create({
        data: {
            name: "Ticket 2",
            projectId: project2.id,
            priorityId: priority.id,
            statusId: status.id,
        },
    });

    // Create a ticket
    const ticket3 = await prisma.ticket.create({
        data: {
            name: "Ticket 3",
            projectId: project2.id,
            priorityId: priority.id,
            statusId: status.id,
        },
    });

    console.log({ user, team, userTeam, priority, status, priorities, statuses, project, ticket });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
