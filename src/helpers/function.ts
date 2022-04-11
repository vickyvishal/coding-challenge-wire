import axios from 'axios';
import { BOWER_SEARCH_API } from '../constants/constant';
import { PackageModel } from '../models/PackageModel';


export const getOwnerName = (url: string) => {
    const owner = url.split("/")[3]
    return owner
}

export const createChunks = (packageModels: PackageModel[], starSorter: boolean) => {
    console.log(packageModels, starSorter)
    let chunks: PackageModel[][] = []
    let sorted: PackageModel[] = []
    if (starSorter) {
        sorted = packageModels.sort((a, b) => (a.stars < b.stars) ? 1 : ((b.stars < a.stars) ? -1 : 0))
    } else {
        sorted = packageModels.sort((a, b) => (a.stars > b.stars) ? 1 : ((b.stars > a.stars) ? -1 : 0))
    }
    while (sorted.length) {
        chunks.push(sorted.splice(0, 5));
    }
    return chunks
}

export const initialAPICall = () => {
    return axios.get(BOWER_SEARCH_API)
}

export const searchAsPerQueryString = (queryString: string) => {
    return axios.get(BOWER_SEARCH_API + `?q=${queryString}`)
}