import { useState } from 'react'
import { useApi } from "../hooks/useApi"

export default function CreateTeam() {
    const [name, setName] = useState('')
    const [abbreviation, setAbbreviation] = useState('')
    const apiClient = useApi()

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault()

        try {
            const response = await apiClient.post('http://localhost:3001/api/teams/', {
                name,
                abbreviation
            })

            console.log(response.data)
            setName('')
            setAbbreviation('')
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Abbreviation:
                <input type='text' value={abbreviation} onChange={(e) => setAbbreviation(e.target.value)} />
            </label>
            <button type='submit' value='Create'>CREATE</button>
        </form>
    )
}
