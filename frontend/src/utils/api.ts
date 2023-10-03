import { PrioritySummary, ProjectSummary, StatusSummary, TeamSummary, TicketDetail, TicketSummary, UserSummary } from "./types";


// TEAMS

export async function fetchTeams(apiClient: any){
    try {
        const response = await apiClient.get('http://localhost:3001/api/teams/');
        const teams: TeamSummary[] = response.data;
        return teams;
    } catch (err) {
        console.error(err);
        // handle error
    }
};

// PROJECTS

export async function fetchProjects(apiClient: any, teamId: string) {
    try {
        const response = await apiClient.get(`http://localhost:3001/api/projects?teamId=${teamId}`);
        const projects: ProjectSummary[] = response.data;
        return projects;
    } catch (err) {
        console.error(err);
        // handle error
    }
}

// TICKETS

export async function fetchTickets(apiClient: any, teamId: string, projectId: string) {
    try {
        const response = await apiClient.get(`http://localhost:3001/api/tickets/${teamId}/${projectId}`);
        const tickets: TicketDetail[] = response.data;
        return tickets;
    } catch (err) {
        console.error(err);
        // handle error
    }
}

export async function fetchTicketById(apiClient: any, teamId: string, projectId: string, ticketId: string) {
    try {
        const response = await apiClient.get(`http://localhost:3001/api/tickets/${teamId}/${projectId}/${ticketId}`);
        const ticket: TicketDetail = response.data;
        return ticket;
    } catch (err) {
        console.error(err);
        // handle error
    }
}

// STATUSES AND PRIORITIES

export async function fetchStatuses(apiClient: any, teamId: string) {
    try {
        const response = await apiClient.get(`http://localhost:3001/api/statuses/${teamId}`);
        const statuses: StatusSummary[] = response.data;
        return statuses;
    } catch (err) {
        console.error(err);
        // handle error
    }
}

export async function fetchPriorities(apiClient: any, teamId: string) {
    try {
        const response = await apiClient.get(`http://localhost:3001/api/priorities/${teamId}`);
        const priorities: PrioritySummary[] = response.data;
        return priorities;
    } catch (err) {
        console.error(err);
        // handle error
    }
}

// USERS AND ASSIGNEES


export async function fetchUsersForTeam(apiClient: any, teamId: string) {
    try {
        const response = await apiClient.get(`http://localhost:3001/api/users/${teamId}`);
        const users: UserSummary[] = response.data;
        return users;
    } catch (err) {
        console.error(err);
        // handle error
    }
}


// CREATION FUNCTIONS

export async function createProject(apiClient: any, name: string, abbreviation: string, teamId: string) {
    try {
        const response = await apiClient.post('http://localhost:3001/api/projects/', {
            name,
            abbreviation,
            teamId
        })
        const createdProject: ProjectSummary = response.data;
        return createdProject;
    } catch (err) {
        console.error(err);
        // handle error
    }
}

export async function createTicket(apiClient: any, teamId: string, projectId: string, name: string, statusId: string, priorityId: string, assigneeId: string, description: string) {
    try {
        const response = await apiClient.post('http://localhost:3001/api/tickets/', {
                name,
                projectId,
                teamId,
                statusId,
                priorityId,
                assigneeId,
                description
            })
        const createdTicket: TicketSummary = response.data;
        return createdTicket;
    } catch (err) {
        console.error(err);
        // handle error
    }
}