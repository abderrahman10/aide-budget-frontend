export async function GetParticipantsStatistics() {
    try {
        const response = await fetch('http://localhost:8081/api/v1/client/count-by-month', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}
