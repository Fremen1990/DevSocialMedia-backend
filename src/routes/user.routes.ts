import {
    acceptRequest,
    activateAccount,
    addFriend,
    addToSearchHistory,
    cancelRequest,
    changePassword,
    deleteRequest,
    findUser,
    follow,
    getAllUsers,
    getFriendsPageInfos,
    getProfile,
    getSearchHistory,
    login,
    register,
    removeFromSearch,
    search,
    sendResetPasswordCode,
    sendVerificationEmail,
    unfollow,
    unfriend,
    updateCover,
    updateDetails,
    updateProfilePicture,
    validateResetCode,
} from '../controllers/user.controllers'
import { authUser } from '../middlewares/auth.middleware'

export default function userRoutes(app) {
    app.post('/api/auth', authUser)
    app.post('/api/register', register)
    app.post('/api/activate', authUser, activateAccount)
    app.post('/api/login', login)
    app.get('/api/getAllUsers', getAllUsers)
    app.post('/api/findUser', findUser)
    app.post('/api/sendVerification', authUser, sendVerificationEmail)
    app.post('/api/sendResetPasswordCode', sendResetPasswordCode)
    app.post('/api/validateResetCode', validateResetCode)
    app.post('/api/changePassword', changePassword)
    app.get('/api/getProfile/:username', authUser, getProfile)
    app.put('/api/updateProfilePicture', authUser, updateProfilePicture)
    app.put('/api/updateCover', authUser, updateCover)
    app.put('/api/updateDetails', authUser, updateDetails)
    app.put('/api/addFriend/:id', authUser, addFriend)
    app.put('/api/cancelRequest/:id', authUser, cancelRequest)
    app.put('/api/follow/:id', authUser, follow)
    app.put('/api/unfollow/:id', authUser, unfollow)
    app.put('/api/acceptRequest/:id', authUser, acceptRequest)
    app.put('/api/unfriend/:id', authUser, unfriend)
    app.put('/api/deleteRequest/:id', authUser, deleteRequest)
    app.post('/api/search/:searchTerm', authUser, search)
    app.put('/api/addToSearchHistory', authUser, addToSearchHistory)
    app.get('/api/getSearchHistory', authUser, getSearchHistory)
    app.put('/api/removeFromSearch', authUser, removeFromSearch)
    app.get('/api/getFriendsPageInfos', authUser, getFriendsPageInfos)
}
