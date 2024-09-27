import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";

/**
 * Asynchronously retrieves the server session using the provided NextAuth options and logs it to the console.
 *
 * @return {Promise<boolean>} A boolean indicating whether a session was found.
 */
export default function SeaaionProviderFunction(): boolean {
  let session ;
  (async () => {
    const session = await getServerSession(auth)
    
  })()
  return true;
}
