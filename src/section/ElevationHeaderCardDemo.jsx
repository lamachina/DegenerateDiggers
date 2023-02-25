import React, { useState } from 'react';
import { Card, TableHead, CardContent, CardHeader, Table, TableRow, TableCell, TableBody, Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';


function ElevationHeaderCardDemo() {
    const [rows, setRows] = useState([]);
    let id = 0;
    function createData(name, symbol, price, change, changeD) {
        let roundedPrice = price;
        if (price > 1) {
            roundedPrice = Math.round(price * 1000) / 1000;
        }
        else if (price < 1) {
            roundedPrice = Math.round(price * 10000000) / 10000000;
        }
        else if (price < 0.0001) {
            roundedPrice = price
        }
        id += 1;
        return { id, name, symbol, price: roundedPrice, change, changeD };
    }

    const handleClick = async () => {
        const NUMBER = "1,1027,1839,74,7226,3890,21794,14803,21516,7778,3890,8795,20755,12087,21262,15271,8000,6953,2943,8705,11047,6950,15480,13663,11188,21106,4166,6929,2620,11156,7228,11113,7501,14767,20187,20527,11848,12220,18934,4307,6719,3911,1637,3773,2424,8125,20763,8290,18439,5604,7653";
        const response = await fetch(
            'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=' + NUMBER + '&convert=USD',
            {
                headers: {
                    'X-CMC_PRO_API_KEY': '3fdcb402-f63c-4ada-89f0-e311abe934b3',
                }
            }
        );
        const json = await response.json();
        const resultat = json.data;
        console.log(resultat);
        const rows = Object.entries(resultat).map(([id, item]) => {
            return createData(
                item.symbol,
                item.slug,
                item.quote.USD.price,
                item.quote.USD.percent_change_1h,
                item.quote.USD.percent_change_24h,
            );
        });
        rows.sort((a, b) => b.changeD - a.changeD);
        setRows(rows);


    };

    function FetchButton() {
        return (
            <Button sx={{ color: "#E5E7E6" }} onClick={handleClick}>Fetch Data</Button>
        );
    }

    // filter rows based on their name and assign them to different categories
    const namesToFilterLayer1 = ['APTOS', 'AURORA', 'INJ', 'CANTO'];
    const layer1 = rows.filter(row => namesToFilterLayer1.includes(row.name));
    const namesToFilterLayer2 = ['METIS', 'MATIC', 'MUTE', 'ZZ', 'ZKP'];
    const layer2 = rows.filter(row => namesToFilterLayer2.includes(row.name));
    const namesToFilterLSD = ['LDO', 'FXS', 'RPL', 'BNC'];
    const lsd = rows.filter(row => namesToFilterLSD.includes(row.name));
    const namesToFilterDerivative = ['GMX', 'PERP', 'UMAMI', 'GNS', 'DPX', 'RDNT', 'RIO', 'HEGIC', 'SWTH', 'DYDX', 'DDX', 'PILOT', 'WOO', 'GMD', 'DXP', 'MAN', 'STRP'];
    const derivative = rows.filter(row => namesToFilterDerivative.includes(row.name));
    const namesToFilterAI = ['GRT', 'OCEAN', 'RLC', 'FET', 'AGIX'];
    const ai = rows.filter(row => namesToFilterAI.includes(row.name));
    const namesToFilterNFT = ['RARE', 'LOOK', 'SUPER', 'JPEG'];
    const nft = rows.filter(row => namesToFilterNFT.includes(row.name));
    const namesToFilterPrivacy = ['SCRT', 'ROSE'];
    const privacy = rows.filter(row => namesToFilterPrivacy.includes(row.name));


    const categories = [
        {
            title: 'Layer 1',
            rows: layer1
        },
        {
            title: 'Layer 2 & ZK',
            rows: layer2
        },
        {
            title: 'LSD',
            rows: lsd
        },
        {
            title: 'Derivatives & Options',
            rows: derivative
        },
        {
            title: 'AI',
            rows: ai
        },
        {
            title: 'NFT',
            rows: nft
        },
        {
            title: 'Privacy',
            rows: privacy
        },
        /*  {
             title: 'All Cryptos',
             rows: rows
         } */
    ];

    return (
        <Card sx={{ marginTop: "1rem", borderRadius: "0.5rem", transition: '0.3s', backgroundColor: '#273859', color: "#E5E7E6" }}>
            <CardHeader title={'Cryptos'} action={<FetchButton />} />
            <CardContent sx={{ pt: 0, textAlign: 'left', overflowX: 'auto', background: '#F2F2F2' }}>
                {categories.map((category) => (
                    <Table>
                        <TableHead>
                            <TableRow sx={{ borderTopStyle: 'groove', borderTopColor: '#273859' }}>
                                <TableCell width={"30%"} sx={{ background: '#273859' }}>
                                    <Typography color="#E5E7E6" variant='h6'>
                                        {category.title}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">1h Change (%)</TableCell>
                                <TableCell align="right">24h Change (%)</TableCell>
                                <TableCell align="right">Price ($USD)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {category.rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row" align='right'>
                                        <Stack flexDirection='row' gap={1}>
                                            <Typography sx={{ color: '#273859' }} variant='h6'>
                                                <strong>{row.name}</strong>
                                            </Typography>
                                            <Typography variant='overline'>
                                                ({row.symbol})
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography color={Math.round(row.change) == 0 ? "#000" : Math.round(row.change) > 0 ? "#014023" : "#A7001E"}>
                                            {Math.round(row.change * 100) / 100}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography color={Math.round(row.changeD) > 0 ? "#014023" : "#A7001E"}>
                                            {Math.round(row.changeD * 100) / 100}
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{ background: row.change > 0 ? "rgba(1, 64, 35," + (row.change / 10) + ")" : "rgba(167, 0, 30," + (row.change / -10) + ")" }} align="right">

                                        <Typography color={row.change > 0 ? (row.change > 5) ? "#fff" : "#000" : (row.change < -5) ? "#fff" : "#000"}>
                                            {row.price}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )
                )}
            </CardContent>
        </Card>
    );
}

export default ElevationHeaderCardDemo;
