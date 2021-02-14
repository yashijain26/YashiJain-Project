
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
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

const Notification = () => {
    const [states, setStates] = useState([]);
    const getData = async () => {
        try {
            const data = await axios.get(
                "https://api.rootnet.in/covid19-in/notifications"
            );
            console.log(data.data.data.notifications);
            setStates(data.data.data.notifications);
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
                        <h1>Notifications & advisories</h1>
                        <Link to="/"><Button variant="contained" color="primary">Go Back</Button></Link>
                    </div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Notification Title</TableCell>
                                    <TableCell>Link</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {states.map((row) => (
                                    <TableRow key={row.title}>
                                        <TableCell>{row.title.slice(0, 10)}</TableCell>
                                        <TableCell>{row.title.slice(11)}</TableCell>
                                        <TableCell>{row.link}</TableCell>
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

export default Notification;
