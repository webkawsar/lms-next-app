import axios from "axios";


export const signIn = async ({ identifier, password }) => {
    try {

        const result = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_SERVER_URL}/api/auth/local`, {
            identifier,
            password
        })
        
        console.log(result, 'result')
        
    } catch (error) {
        
        console.log(error, 'error in sign in')
    }
}


