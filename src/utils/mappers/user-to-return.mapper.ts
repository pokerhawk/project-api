import { User } from "prisma/generated/client";

export const userToReturnMapper = (user:User):Partial<User> =>{
    return {
        id: user.id,
        name: user.name,
        email: user.email
    }
}