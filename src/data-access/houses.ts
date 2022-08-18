import request from '@/http/index'
import { HouseDetails } from '@/types/houses'

export const getHouseDetails = (id: string) => request.get<HouseDetails>(`/rent-in-houses/${id}`)
