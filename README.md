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

----

### TECHNOLOGIES:

### - JavaScript <img src="https://www.lightgalleryjs.com/images/logos/javascript.svg" width="25" />

### - TypeScript  <img src="https://www.devthomas.pl/static/media/typescript.3de182d2.svg" width="25" /> - migration to TypeScript in progress, still need polishing

### - NodeJS  <img src="https://www.devthomas.pl/static/media/nodejs.a1231528.svg" width="25" />

### - Express <img src="https://www.devthomas.pl/static/media/express.c6bab64b.svg" width="25" />

### - MongoDB (mongoose) <img src="https://www.devthomas.pl/static/media/mongodb.2985235d.svg" width="25" />

### - JWT (Json Web Token) <img src="https://www.devthomas.pl/static/media/nodejs.a1231528.svg" width="25" />

### - OAuth 2.0

-----

### TESTING: - in progress, first tests soon...

[//]: # (<img src="https://miro.medium.com/max/1400/1*PoH0pTYeT1zmX06Ehbq1UA.jpeg" width="400" />)

### Jest <img src="https://www.devthomas.pl/static/media/testing_jest.369f0112.webp" width="25" />

### SuperTest <img src="architecture/super+test.png" width="45" />

----

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
- jest
- supertest
- ts-jest

[//]: # (## Data flow:)

[//]: # ()

[//]: # (![]&#40;architecture/data-flow.png&#41;)

----

## Application structure:

![](architecture/project-architectureTS.png)

## Folders structure:

![](architecture/folders-structureTS.png)

-----

### Project currently in progress, future improvements:

- [x] Prepare README
- [x] Refactoring Backend to TypeScript
- [ ] Unit Testing
- [ ] Endpoint testing with SuperTest
- [ ] Testing coverage report
- [ ] Prometheus Metrics with Grafana dashboard
- [ ] Migration to NestJS on separated branch
 