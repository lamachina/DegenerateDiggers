import React, { useState } from 'react';
import { Button, Card, Grid, Stepper, Step, StepLabel, StepContent, Radio, FormControlLabel, RadioGroup } from '@mui/material';
import { Stack } from '@mui/system';
import "./../App.css"



const questions = [
    "TEAM: business & dev",
    "This is question 2",
    "This is question 3",
    "This is question 4",
];

const answers = [
    ["The team is already famous", "The team is unknown but transparent", "The team is mysterious"],
    ["Answer 1", "Answer 2", "Answer 3"],
    ["Answer 1", "Answer 2", "Answer 3"],
    ["Answer 1", "Answer 2", "Answer 3"],
];

function StepperWithQuestion() {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedValues, setSelectedValues] = useState({});

    const handleNext = () => {
        setSelectedValues({ ...selectedValues, [questions[activeStep]]: selectedValue });
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        console.log(selectedValues);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const [selectedValue, setSelectedValue] = useState('');
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <Grid display='flex' flexDirection='column'>
            <Stepper activeStep={activeStep} orientation="vertical" className="stepPi">
                {questions.map((question, index) => (
                    <Step className="stepPiColumn" key={question} >
                        <StepLabel>{question}</StepLabel>
                        <StepContent className="stepPi">
                            <RadioGroup name={question} value={selectedValue} onChange={handleChange}>
                                {answers[index].map((answer) => (
                                    <FormControlLabel key={answer} value={answer} control={<Radio />} label={answer} />
                                ))}
                            </RadioGroup>
                            <Stack sx={{ flexDirection: 'row' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack}>
                                        Back
                                    </Button>
                                )}
                                <Button onClick={handleNext}>
                                    {activeStep === questions.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </Stack>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            <Card sx={{ padding: '1rem' }}>
                {activeStep === questions.length &&
                    Object.entries(selectedValues).map(([question, answer]) => (
                        <div key={question}>
                            Question: {question} <br />
                            Answer: {answer}
                        </div>
                    ))}
            </Card>
        </Grid>
    );
}

export default StepperWithQuestion;
