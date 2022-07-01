exports.home =async (req, res) => {
    await res.status(200).json({message:"message from the user"})
}