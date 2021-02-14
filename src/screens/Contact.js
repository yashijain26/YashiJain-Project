import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    Button,
} from "@material-ui/core";
import { Link } from 'react-router-dom'

const Contact = () => {
    const [states, setStates] = useState([]);
    const getData = async () => {
        try {
            const data = await axios.get(
                "https://api.rootnet.in/covid19-in/contacts"
            );
            console.log(data.data.data.contacts.regional);
            setStates(data.data.data.contacts.regional);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <section id="contact">
                <div className="container">
                    <div className="heading">
                        <h1>Contact & Helpline Information</h1>
                        <Link to="/"><Button variant="contained" color="primary">Go Back</Button></Link>
                    </div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>State Name</TableCell>
                                    <TableCell>Helpline Number</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {states.map((row) => (
                                    <TableRow key={row.loc}>
                                        <TableCell>{row.loc}</TableCell>
                                        <TableCell>{row.number}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </section>
        </>
    );
};

export default Contact;
