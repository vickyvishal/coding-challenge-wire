import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';




function MainBar() {
    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: "white" }}>
                <Container sx={{ marginLeft: "inherit" }}>
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 4, display: { md: 'flex', marginLeft: "4px" } }}
                        >
                                {"Package Search"}
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

export default MainBar;
