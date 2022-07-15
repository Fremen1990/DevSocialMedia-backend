![](architecture/logo.png)

## DevSocialMedia - backend v1.

### The idea and purpose of this project is to make a project which will be a journey not a goal to achieve, to expose myself for re-factorization, bug-fixes and place to grow to implement other technologies keeping in mind TypeScript and NextJS.

### Project is a back-end api for social media platform which use features:

- **REGISTER** - create new user with email confirmation using gogleapis and nodemailer
- **FORGOT PASSWORD** - send email with code to reset password
- **USER AUTHORIZATION** JWT - users are authorized using JSON Web Tokens
- **EDIT USER DETAILS** - CRUD for user details
- **UPLOAD FILE** - user can upload profile image, cover image, post images and comments images and store it on
  cloudinary
- **ADD FRIEND/FOLLOW** - user can add or follow friend and automatically see their posts on home page
- **REACT and COMMENT** - users can send reactions and comments to posts which are stored in database
- **LIVE SEARCH with** SEARCH HISTORY - user can live search another user (full name or surename) and search results are
  stored for future searches

### TECHNOLOGIES:

### - JavaScript <img src="https://www.lightgalleryjs.com/images/logos/javascript.svg" width="25" />

### - TypeScript  <img src="https://www.devthomas.pl/static/media/typescript.3de182d2.svg" width="25" /> - conversion to TS in progress, missing types for user data from mongoDB

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
- typescript
- ts-node
- ts-node-dev
- config
- dayjs
- pino / pino-pretty
- prettier

## Application structure:

![](architecture/project-architectureTS.png)

## Folders structure:

![](architecture/folders-structureTS.png)

### Project currently in progress, future improvements:

- [x] Prepare README
- [x] Refactoring Backend to TypeScript
- [ ] Unit Testing
- [ ] Testing coverage report
- [ ] Endpoint testing with SuperTest
- [ ] Migration to NestJS on separated branch
 