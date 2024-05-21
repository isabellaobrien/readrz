import {rest} from 'msw'

const baseURL = "https://reading-media-api-9661e3dfdf56.herokuapp.com/";

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req,res,ctx) => {
        return res(ctx.json(
            {
                "pk": 1,
                "username": "jazz",
                "email": "",
                "first_name": "",
                "last_name": "",
                "profile_id": 1,
                "profile_image": "https://res.cloudinary.com/dfj3ee3tl/image/upload/v1/media/images/grumpy_kermit_cgsegf"
            }
        ))
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req,res,ctx) => {
        return res(ctx.status(200))
    })
]