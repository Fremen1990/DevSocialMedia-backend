import supertest from "supertest";
import createServer from "../utils/server";

const app = createServer();


// const userInput = {
//     first_name: "TestingMan",
//     last_name: "WhoTestsTheTest",
//     email: "testotesting6@lodores.com",
//     password: "fsvvsvrtf423",
//     bYear: "1990",
//     bMonth: "10",
//     bDay: "31",
//     gender: "male"
// };
//
// const userPayload = {
//     id: "62d21b3dce6a0bb4fb323f0d",
//     username: "TomvardsfsaszStanridffssz",
//     picture: "https://www.clipartmax.com/png/full/31-313897_avatar-contact-default-starwars-user-yoda-icon-star-wars-yoda-silhouette-transparent.png",
//     first_name: "Tomvardsfsasz",
//     last_name: "Stanridffssz",
//     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDIxYjNkY2U2YTBiYjRmYjMyM2YwZCIsImlhdCI6MTY1NzkzNjcwMSwiZXhwIjoxNjU4NTQxNTAxfQ.kglzcoHpgCM1vwv8lHwayQLGRw0jwi_nSgyvaGZkuSs",
//     verified: false,
//     message: "Register Success! Please activate your email"
// }

describe("user", () => {
    describe("user List", () => {
        it("Should return 200 for find profile request", async () => {
            const username = "ElonMust"

            const {statusCode} = await supertest(app).get(`/api/getProfile/${username}`)

            expect(statusCode).toBe(200)
        })


    })
})