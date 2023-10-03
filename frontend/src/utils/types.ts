export type UserSummary = {
    id: string;
    name: string;
    email: string;
}

export type UserDetail = UserSummary & {
    auth0Id: string;
    defaultTeam?: TeamSummary;
}

export type TeamSummary = {
    id: string;
    name: string;
    abbreviation: string;
}

export type TeamDetail = TeamSummary & {
    users: UserSummary[];
    projects: ProjectSummary[];
    priorities: PrioritySummary[];
    statuses: StatusSummary[];
}

export type ProjectSummary = {
    id: string;
    name: string;
    abbreviation: string;
    team: TeamSummary;
}

export type ProjectDetail = ProjectSummary & {
    tickets: TicketSummary[];
}

export type TicketSummary = {
    id: string;
    name: string;
    project: ProjectSummary;
    assigneeId: string;
    identifier: number;
    startDate?: Date;
    dueDate?: Date;
}

export type TicketDetail = TicketSummary & {
    priorityId: string;
    statusId: string;
    description: string;
}

export type PrioritySummary = {
    id: string;
    name: string;
    isCustom?: boolean;
    colorHex?: string;
}

export type StatusSummary = {
    id: string;
    name: string;
    isCustom?: boolean;
    colorHex?: string;
}
