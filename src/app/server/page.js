import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

const Server = async () => {
    const session = await getServerSession(authOptions);
    console.log(session, 'server session')


    return (
      <div>Server page</div>
    )
}

export default Server