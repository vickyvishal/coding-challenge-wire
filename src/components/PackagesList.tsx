import { Paper, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { PackageModel } from '../models/PackageModel';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { createChunks, getOwnerName, initialAPICall, searchAsPerQueryString } from '../helpers/function';




export const PackageList = () => {
    const [searchedList, setSearchedList] = useState<PackageModel[][]>([[]])
    const [queryString, setQueryString] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [starSorter, setStarSorter] = useState<boolean>(true)

    useEffect(() => {
        setIsLoading(true)
        initialAPICall().then((res: any) => {
            setSearchedList(createChunks(res.data, starSorter))

        }).catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        if (queryString !== "") {
            searchAsPerQueryString(queryString).then((res: any) => {
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
