import { clerkClient, getAuth } from "@clerk/express"

// Middleware ( Protect Educator Routes )
export const protectEducator = async (req, res, next) => {
    try {
        const auth = getAuth(req);

        // console.log("Auth:", auth.userId);

        const userId = auth.userId;
        // const { userId } = auth;

        // console.log(userId,auth)

        const response = await clerkClient.users.getUser(userId)

        if (response.publicMetadata.role !== "educator") {
            return res.json({
                success: false,
                message: "Unauthorized Access"
            })
        }
        next()
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
            status: 'Middle Ware Error'
        })
    }
}