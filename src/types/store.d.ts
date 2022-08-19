import { houseDetails } from '@/tests/fixtures/houseDetails'
import { HouseDetails } from './houses'

declare global {

    namespace AppState {

        interface Houses {
            houseDetails: HouseDetails | null
        }

        interface RootState {
            houses: Houses
        }
    }

}
