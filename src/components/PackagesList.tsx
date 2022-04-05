import { Paper, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BOWER_SEARCH_API } from '../constants/constant'
import { PackageModel } from '../models/PackageModel';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const getOwnerName = (url: string) => {
    let owner = url.split("/")[3]
    return owner
}

const createChunks = (packageModels: PackageModel[], starSorter: boolean) => {
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


export const PackageList = () => {
    const [searchedList, setSearchedList] = useState<PackageModel[][]>([[]])
    const [queryString, setQueryString] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [starSorter, setStarSorter] = useState<boolean>(true)

    const initialAPICall = () => {
        axios.get(BOWER_SEARCH_API).then((res: any) => {
            setSearchedList(createChunks(res.data, starSorter))
        }).catch((err) => console.log(err))
    }


    useEffect(() => {
        setIsLoading(true)
        initialAPICall();
    }, [])

    useEffect(() => {
        if (queryString !== "") {
            axios.get(BOWER_SEARCH_API + `?q=${queryString}`).then((res: any) => {
                setSearchedList(createChunks(res.data, starSorter))
            }).catch((err) => console.log(err))
        } else {
            initialAPICall();
        }
    }, [queryString])

    useEffect(() => {
        setIsLoading(false)
    }, [searchedList])

    useEffect(() => {
        if (!isLoading) {
            setSearchedList(createChunks(searchedList.flat(1), starSorter))
        }
    }, [starSorter])

    const handleInputChange = (e: any) => {
        setQueryString(e.target.value)
    }


    return (
        <>
            <TextField id="outlined-basic" label="Search..."
                variant="outlined"
                sx={{ marginBottom: "20px", width: "100%" }}
                value={queryString}
                onChange={(e) => handleInputChange(e)}
            />
            {!isLoading && <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold", color: "#2451B2", width: "33%" }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: "bold", color: "#2451B2", width: "33%" }}>Owner</TableCell>
                            <TableCell onClick={() => setStarSorter(!starSorter)} sx={{ fontWeight: "bold", color: "#2451B2", width: "33%", cursor: "pointer" }}>
                                Stars

                                {
                                    starSorter ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />

                                }
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            searchedList[0] && searchedList[0].length > 0 && searchedList[currentPage - 1].map((bowerPackage: PackageModel) => {
                                return <TableRow key={bowerPackage.name}>
                                    <TableCell>{bowerPackage.name}</TableCell>
                                    <TableCell>{getOwnerName(bowerPackage.repository_url)}</TableCell>
                                    <TableCell>{bowerPackage.stars}</TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>

            </TableContainer>}

            <Stack spacing={2} sx={{ marginTop: "20px" }}>
                <Pagination page={currentPage} onChange={(e: any, page: number) => setCurrentPage(page)} count={searchedList.length} color="primary" />
            </Stack>
        </>

    )
}
