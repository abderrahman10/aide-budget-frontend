
export async function FindParticipant({ slug }: { slug: string }) {

 const token=slug;

    try {
        const userInfoResponse = await fetch(`http://localhost:8081/api/v1/participants/find/${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
              
            },
        })

        if (!userInfoResponse.ok) {
            return null;
        }

        return await userInfoResponse?.json()
    } catch (error) {
        console.log(error)
        return null;
    }

}