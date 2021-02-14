
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Button,
    Select,
    MenuItem,
    FormHelperText,
    FormControl,
    InputLabel,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import { DateRange } from 'react-date-range';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 160,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Comparision = () => {
    const classes = useStyles();
    const [confirmed, setConfirmed] = useState([]);
    const [samples, setSamples] = useState([]);
    const [qstate, setQstate] = useState("");
    const [qdate, setQdate] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    console.log(qdate.startDate)

    const getData = async () => {
        try {
            const confData = await axios.get(
                "https://api.rootnet.in/covid19-in/stats/history"
            );
            const sampData = await axios.get(
                "https://api.rootnet.in/covid19-in/stats/testing/history"
            );
            setConfirmed(confData.data.data);
            setSamples(sampData.data.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const allDates = [];
    confirmed.forEach(obj => {
        if (!allDates.some(o => o.day === obj.day)) {
            allDates.push(obj.day)
        }
    });

    const allStates = ["Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu and Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttarakhand",
        "Uttar Pradesh",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli",
        "Daman and Diu",
        "Delhi",
        "Lakshadweep",
        "Puducherry",
        "Ladakh"];


    const totalConfirmed = [];
    confirmed.forEach(obj => {
        if (!totalConfirmed.some(o => o.summary === obj.summary)) {
            totalConfirmed.push(obj.summary.total)
        }
    });

    const totalSampled = [];
    samples.forEach(obj => {
        if (!totalSampled.some(o => o === obj)) {
            totalSampled.push(obj.totalSamplesTested)
        }
    })
    // console.log(allDates)

    const state = {
        labels: allDates,
        datasets: [
            {
                label: 'Total Confirmed',
                fill: false,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(255,0,0,1)',
                pointRadius: 0,
                data: totalConfirmed
            },
            {
                label: 'Total Sampled tests',
                fill: false,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,255,0,1)',
                pointRadius: 0,
                data: totalSampled
            }
        ]
    }

    return (
        <>
            <section id="contact">
                <div className="container">
                    <div className="heading">
                        <h1>Daily statistics comparison between both the sample tests and confirmed cases</h1>

                    </div>
                    <Link to="/"><Button className="mb-5" variant="contained" color="primary">Go Back</Button></Link>
                    <Line
                        data={state}
                        options={{
                            legend: {
                                display: true,
                                position: 'right'
                            }
                        }}
                    />

                    {/* <FormControl className={classes.formControl}>
                        <InputLabel>States</InputLabel>
                        <Select
                            value={qstate}
                            onChange={(e) => { setQstate(e.target.value) }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {allStates.map((val) => (
                                <MenuItem value={val}>
                                    {val}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Filter by State</FormHelperText>
                    </FormControl>
                    <DateRange
                        editableDateInputs={true}
                        onChange={item => setQdate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={qdate}
                    />
                    <Line
                        data={state}
                        options={{
                            legend: {
                                display: true,
                                position: 'right'
                            }
                        }}
                    /> */}
                </div>
            </section>
        </>
    );
};

export default Comparision;
