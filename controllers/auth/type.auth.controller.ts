import {Request} from "express"

export interface SignUpBodyRequest{
    name: string,
    email: string,
    password: string,
}