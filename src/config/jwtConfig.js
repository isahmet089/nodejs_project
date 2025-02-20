module.exports={
    accessToken:{
        secret:process.env.JWT_ACCESS_SECRET || "d616a165ed32a3205675174a44bdf068b0c51b32266901bc34271e02afdcc1f6",
        expiresIn:"15m",
    },
    refreshToken:{
        secret:process.env.JWT_REFRESH_SECRET || "a28dcdf27139b4698456bf286550aacff6650636c11ca2d497a5f63fb6a80883",
        expiresIn:"7d",
    }
};