import { Button, Divider, Grid, Paper } from '@mui/material';
import React, { useState } from 'react';

function DegenEye() {
    const [data, setData] = useState(null);
    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [change, setChange] = useState(null);

    const handleClick = async () => {

        const response = await fetch(
            'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map',
            {
                headers: {
                    'X-CMC_PRO_API_KEY': '3fdcb402-f63c-4ada-89f0-e311abe934b3',
                }
            }
        );
        const json = await response.json();
        console.log(json.data);
        const resultat = json.data;

    };

    return (
        <Grid display="flex" flexDirection={"column"} alignItems="center">
            <Button onClick={handleClick}>Fetch Data</Button>
            {/* {data && */}
            <Paper elevation={11} sx={{
                p: "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",

                borderRadius: "3rem"
            }} >
                <p> test </p>
                <Divider variant='middle' sx={{ borderColor: "#000", borderWidth: "1rem" }} >CENTER</Divider>

                <p>name</p>
                <p>2317.505657545465465768754687675</p>
                <p>56%</p>
            </Paper>
            {/*     } */}
        </Grid>
    );
}

export default DegenEye;
