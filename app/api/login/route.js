import { fetchOptions, fetchBodyDoctors, baseUrl } from "../database/db";
import bcrypt from "bcryptjs"

export async function POST(request) {
  const body = await request.json();
  const userStream = await fetch(`${baseUrl}/findOne`, {
    ...fetchOptions,
    body: JSON.stringify({
        ...fetchBodyDoctors,
        filter: {
            alias: body.username
        }
    })
  })
  const users = await userStream.json()
  const user = users.document
  if(!user){return new Response(false)}
  const valid = await bcrypt.compare(body.password, user.password)
  if(!valid){return new Response(false)};
  return new Response(JSON.stringify({userId: user.id, userGroupId: user.userGroupId}));
}
