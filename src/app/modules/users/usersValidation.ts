import { z } from "zod";

const createUserZodSchema = z.object({
    body: z.object({
        name: z.object({
            firstName: z.string({
                required_error: 'first name is required',
                
            }),
            lastName: z.string({
                required_error: 'last name is required',

            }),
        }),
        phoneNumber: z.string({
            required_error: 'phone number is required',

        }),

        email: z.string({
            required_error: 'email is required',
            
        }),
        password: z.string({
            required_error: 'password is required',
           
        }),

    }),
});
export const UserValidation = {
    createUserZodSchema
  };