// TeamContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { TeamSummary } from '../utils/types';

type TeamContextType = {
    currentTeam: TeamSummary;
    setCurrentTeam: React.Dispatch<React.SetStateAction<TeamSummary>>;
    teams: TeamSummary[];
    loading: boolean;
};

// Create the context with default initial value
const TeamContext = createContext<TeamContextType | undefined>(undefined);

type TeamProviderProps = {
    children: React.ReactNode;
    teamId?: string;
};

export function TeamProvider({ children, teamId }: TeamProviderProps ) {
    const [currentTeam, setCurrentTeam] = useState<TeamSummary>({} as TeamSummary);
    const [teams, setTeams] = useState<TeamSummary[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const apiClient = useApi();

    useEffect(() => {
        console.log("teamId", teamId);
        const fetchTeam = async () => {
            try {
                const response = await apiClient.get('http://localhost:3001/api/teams/'); // your endpoint here
                console.log("trying", response);
                const fetchedTeams = response.data;
                setTeams(fetchedTeams);
                
                // Check if there is a teamId in the URL
                if (teamId) {
                    const teamFromUrl = fetchedTeams.find((team: TeamSummary) => team.id === teamId);
                    // If a team matching the teamId is found, set it as the currentTeam
                    if (teamFromUrl) {
                        setCurrentTeam(teamFromUrl);
                    }
                } else {
                    const firstFetchedTeam = fetchedTeams[0];
                    setCurrentTeam(firstFetchedTeam);
                }
                setLoading(false);
            } catch (err) {
                console.error(err);
                // handle error
            }
        };
        fetchTeam();
    }, [teamId]); // update currentTeam when teamId changes

    return (
        <TeamContext.Provider value={{ currentTeam, setCurrentTeam, teams, loading }}>
            {children}
        </TeamContext.Provider>
    );
};


export const useTeam = (): TeamContextType => {
    const context = useContext(TeamContext);
    if (!context) {
        throw new Error('useTeam must be used within a TeamProvider');
    }
    return context;
};
