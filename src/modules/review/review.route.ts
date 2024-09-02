import { Router } from 'express'
import { authValidation } from '../../middelware/auth'
import { postReview,getAllReviews } from './review.module'
const route=Router()
route.post('/review',authValidation('user'),postReview)
route.get('/get-all-reviews',authValidation('user'),getAllReviews)



export const reviewRoute=route