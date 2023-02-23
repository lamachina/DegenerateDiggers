import * as React from "react";
import { ethers } from "ethers";
import DegenEye from "./DegenEye";
import { Grid } from "@mui/material";

function About() {
    const [status, setStatus] = React.useState("");

    const [hasPaid, setHasPaid] = React.useState(false);

    const checkPayment = async () => {
        const address = "0x468197Ed39c5717FCC9aB8Ee4E1e0Af7A809536d"; // Replace with the address to check
        const apiKey = "BM854JCXBJZQFF3C1HN3X8P2F5SQSUYCRM"; // Replace with your Etherscan API key
        const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;
        const response = await fetch(url);
        const json = await response.json();
        const transactions = json.result;
        console.log(transactions);
        const now = Date.now() / 1000;
        for (const transaction of transactions) {
            const timestamp = parseInt(transaction.timeStamp, 10);
            if (now - timestamp <= 86400) {
                setHasPaid(true);
                return;
            }
        }
        setHasPaid(false);
    };

    const handleSendEth = async () => {
        console.log(hasPaid);
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await window.ethereum.enable();
            const signer = provider.getSigner();
            const recipient = "0x468197Ed39c5717FCC9aB8Ee4E1e0Af7A809536d"; // Replace with the recipient's address
            const amount = ethers.utils.parseEther("0.0001"); // Replace with the amount of ETH to send
            const transaction = {
                to: recipient,
                value: amount,
                data: "0x",
                gasLimit: 21000,
                gasPrice: ethers.utils.parseUnits("10", "gwei")
            };
            const signedTransaction = await signer.sendTransaction(transaction);
            console.log("Transaction sent:", signedTransaction);
            setStatus("PAID");
        } catch (error) {
            console.error("Transaction failed:", error);
            setStatus("TRANSACTION FAILED");
        }
    };

    return (
        <><div>
            <button onClick={handleSendEth} disabled={status === "PAID"}>
                {status === "PAID" ? "PAID" : "pay"}
            </button>
            {status === "PAID" && <div>Payment successful!</div>}
            {status === "TRANSACTION FAILED" && <div>Transaction failed.</div>}
        </div><div>
                <button onClick={checkPayment}>Check Payment</button>
                {hasPaid && <div>This address has paid you in the last 24 hours.</div>}
                {!hasPaid && <div>This address has not paid you in the last 24 hours.</div>}
            </div>
            <Grid display="flex" justifyContent="center">
                <DegenEye />
            </Grid>

        </>
    );
}

export default About;
