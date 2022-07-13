![](architecture/logo.png)  
## DevSocialMedia - backend v0.1

### The idea and purpose of this project is to make a project which will be a journey not a goal to achieve,  to expose myself for re-factorization, bug-fixes and place to grow to implement other technologies keeping in mind TypeScript and NextJS.


### Project is a back-end api for social media platform which use features:
- **REGISTER** - create new user with email confirmation using gogleapis and nodemailer
- **FORGOT PASSWORD** - send email with code to reset password
- **USER AUTHORIZATION** JWT - users are authorized using JSON Web Tokens
- **EDIT USER DETAILS** - CRUD for user details
- **UPLOAD FILE** - user can upload profile image, cover image, post images and comments images and store it on cloudinary
- **ADD FRIEND/FOLLOW** - user can add or follow friend and automatically see their posts on home page
- **REACT and COMMENT** - users can send reactions and comments to posts which are stored in database
- **LIVE SEARCH with** SEARCH HISTORY - user can live search another user (full name or surename) and search results are stored for future searches




### TECHNOLOGIES:
### - JavaScript <img src="https://www.lightgalleryjs.com/images/logos/javascript.svg" width="25" />
### - NodeJS  <img src="https://www.devthomas.pl/static/media/nodejs.a1231528.svg" width="25" />
### - Express <img src="https://www.devthomas.pl/static/media/express.c6bab64b.svg" width="25" />
### - MongoDB (mongoose) <img src="https://www.devthomas.pl/static/media/mongodb.2985235d.svg" width="25" />
### - JWT (Json Web Token) <img src="https://www.devthomas.pl/static/media/nodejs.a1231528.svg" width="25" />
### - OAuth 2.0 
### Packages:
- Nodemailer
- googleapis
- express-fileupload
- cloudinary
- bcrypt
- cors


## Application structure:
![](architecture/project-architecture.png)

## Folders structure:
![](architecture/folders-structure.png)


### Project currently in progress, future improvements:

- [x] Prepare README
- [ ] Refactoring Backend to TypeScript
- [ ] Unit Testing 
- [ ] Testing coverage report
- [ ] Endpoint testing with SuperTest
- [ ] Migration to NestJS on separated branch
 