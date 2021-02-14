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
    Select,
    MenuItem,
    FormHelperText,
    FormControl,
    InputLabel
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 160,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Medical = () => {
    const classes = useStyles();
    const [states, setStates] = useState([]);
    const [qstate, setQstate] = useState("");
    const [qtype, setQtype] = useState("");
    const getData = async () => {
        try {
            const data = await axios.get(
                "https://api.rootnet.in/covid19-in/hospitals/medical-colleges"
            );
            setStates(data.data.data.medicalColleges);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const stateNames = [];
    states.forEach(obj => {
        if (!stateNames.some(o => o.state === obj.state)) {
            stateNames.push({ ...obj })
        }
    });

    const types = [];
    states.forEach(obj => {
        if (!types.some(o => o.ownership === obj.ownership)) {
            types.push({ ...obj })
        }
    });

    function search(rows) {
        return rows.filter(row => row.state.indexOf(qstate) > -1).filter(row => row.ownership && row.ownership.indexOf(qtype) > -1)
    }

    return (
        <>
            <section id="contact">
                <div className="container">
                    <div className="heading">
                        <h1>Medical Colleges & beds</h1>
                        <Link to="/">
                            <Button variant="contained" color="primary">
                                Go Back
              </Button>
                        </Link>
                    </div>
                    <FormControl className={classes.formControl}>
                        <InputLabel>States</InputLabel>
                        <Select
                            value={qstate}
                            onChange={(e) => { setQstate(e.target.value) }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {stateNames.map((val) => (
                                <MenuItem value={val.state}>
                                    {val.state}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Filter by State</FormHelperText>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={qtype}
                            onChange={(e) => { setQtype(e.target.value) }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {types.map((val) => (
                                <MenuItem value={val.ownership}>
                                    {val.ownership}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Filter by Type</FormHelperText>
                    </FormControl>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>State Name</TableCell>
                                    <TableCell>Institute Name</TableCell>
                                    <TableCell>City</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Admission Capacity</TableCell>
                                    <TableCell>Hospital Beds</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {search(states).map((row) => (
                                    <TableRow>
                                        <TableCell>{row.state}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.city}</TableCell>
                                        <TableCell>{row.ownership}</TableCell>
                                        <TableCell>{row.admissionCapacity}</TableCell>
                                        <TableCell>{row.hospitalBeds}</TableCell>
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

export default Medical;
