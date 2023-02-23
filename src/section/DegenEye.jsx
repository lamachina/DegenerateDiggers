import { Button, Grid, Paper } from '@mui/material';
import React, { useState } from 'react';

function DegenEye() {
    const [data, setData] = useState(null);
    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [change, setChange] = useState(null);

    const handleClick = async () => {
        const response = await fetch(
            'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1,1027,1839,74&convert=USD',
            {
                headers: {
                    'X-CMC_PRO_API_KEY': process.env.API_KEY
                }
            }
        );
        const json = await response.json();
        console.log(json.data);
        const resultat = json.data;
        const name = resultat[1].slug
        const price = resultat[1].quote.USD.price;
        const change = resultat[1].quote.USD.percent_change_1h;
        setData(resultat);
        setName(name)
        setPrice(price)
        setChange(change)
    };

    return (
        <Grid display="flex" flexDirection={"column"} alignItems="center">
            <Button onClick={handleClick}>Fetch Data</Button>
            {data &&
                <Paper elevation={11} sx={{ p: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }} >
                    <p> test </p>
                    <p>{name}</p>
                    <p>{price}</p>
                    <p>{change}</p>
                </Paper>
            }
        </Grid>
    );
}

export default DegenEye;
