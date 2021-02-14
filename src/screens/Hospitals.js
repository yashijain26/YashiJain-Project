
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

const Hospitals = () => {
    const [states, setStates] = useState([]);
    const getData = async () => {
        try {
            const data = await axios.get(
                "https://api.rootnet.in/covid19-in/hospitals/beds"
            );
            console.log(data.data.data.regional);
            setStates(data.data.data.regional);
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
                        <h1>Hospitals & beds</h1>
                        <Link to="/"><Button variant="contained" color="primary">Go Back</Button></Link>
                    </div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>State Name</TableCell>
                                    <TableCell>Rural Hospitals</TableCell>
                                    <TableCell>Rural Beds</TableCell>
                                    <TableCell>Urban Hospitals</TableCell>
                                    <TableCell>Urban Beds</TableCell>
                                    <TableCell>Total Hospitals</TableCell>
                                    <TableCell>Total Beds (State Wise)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {states.map((row) => (
                                    <TableRow key={row.state}>
                                        <TableCell>{row.state}</TableCell>
                                        <TableCell>{row.ruralHospitals}</TableCell>
                                        <TableCell>{row.ruralBeds}</TableCell>
                                        <TableCell>{row.urbanHospitals}</TableCell>
                                        <TableCell>{row.urbanBeds}</TableCell>
                                        <TableCell>{row.totalHospitals}</TableCell>
                                        <TableCell>{row.totalBeds}</TableCell>
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

export default Hospitals;
