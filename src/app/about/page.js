import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

const About = async () => {
    const session = await getServerSession(authOptions);
    // console.log(session, 'server session')


    return (
      <div>About page</div>
    )
}

export default About