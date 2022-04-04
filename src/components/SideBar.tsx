import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { sidebarList } from '../constants/constant';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

export const BasicList = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [isMenuHidden, setIsMenuHidden] = useState<boolean>(false);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    useEffect(() => {
        width <= 768 ? setIsMenuHidden(true) : setIsMenuHidden(false)
    }, [width])

    const isMobile: boolean = width <= 768;


    return (
        <>
            {isMobile && <Button onClick={() => setIsMenuHidden(!isMenuHidden)}>Menu</Button>}
            {!isMenuHidden && <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <nav aria-label="main menu for Bower">
                    <List>
                        {
                            sidebarList.map((linkName: string) => {
                                return <div key={linkName}><ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={linkName} />
                                    </ListItemButton>
                                </ListItem>
                                    <Divider />
                                </div>
                            })
                        }

                    </List>

                </nav>

            </Box>}
        </>

    );
}