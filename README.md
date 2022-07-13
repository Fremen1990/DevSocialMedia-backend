# DevSocialMedia - backend v0.1 beta

### The idea and purpose of this project is to make a project which will be a journey not a goal to achieve,  to expose myself for re-factorization, bug-fixes and place to grow to implement other technologies keeping in mind TypeScript and NextJS.


### Project is a back-end api for social media platform which use features:
- REGISTER - create new user with email confirmation using gogleapis and nodemailer
- FORGOT PASSWORD - send email with code to reset password
- USER AUTHORIZATION JWT - users are authorized using JSON Web Tokens
- UPLOAD FILE - user can upload profile image, cover image, post images and comments images and store it on cloudinary
- ADD FRIEND/FOLLOW - user can add or follow friend and automatically see their posts on home page
- REACT and COMMENT - users can send reactions and comments to posts which are stored in database
- LIVE SEARCH with SEARCH HISTORY - user can live search another user (full name or surename) and search results are stored for future searches

### TECHNOLOGY:
- NODE JS
- Express
- MongoDB (mongoose)
- JWT (Json Web Token)
- OAuth 2.0
- Nodemailer
- googleapis
- express-fileupload
- cloudinary
- bcrypt
- cors

### Project currently in progress, future improvments:

- [x] Prepare README
- [ ] Refactoring Backend to TypeScript
- [ ] Unit Testing 
- [ ] Testing coverage report
- [ ] Endpoint testing with SuperTest
- [ ] Migration to NestJS on separated branch
 