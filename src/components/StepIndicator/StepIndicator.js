import React from 'react';

const StepIndicator = ({ currentNumber, totalNumbers, setStepIndicator }) => {

    const [arrayOfNumbers, setArrayOfNumbers] = React.useState([]);

    React.useEffect(() => {

        var a = [];
        for (var i = 1; i <= totalNumbers; i++) {
            a.push(i);
        }
        setArrayOfNumbers(a);
    }, [totalNumbers]);


    const handleClick = (k) => {
        if (k >= currentNumber)
            return;
        
        setStepIndicator(k);
    }

    return (
        <React.Fragment>
            <div className="step-indicator divided">
                {arrayOfNumbers && arrayOfNumbers.map(k => {
                    return (
                        <React.Fragment>
                            <div
                                className={k <= currentNumber && ("active")}
                                onClick={() => handleClick(k)}
                            >
                            {k}
                            </div>
                            {k < arrayOfNumbers.length && (<span className={k < currentNumber && 'divider active' || 'divider'}></span>)}
                        </React.Fragment>
                    )
                })}
            </div>
        </React.Fragment>
    )
}

export default StepIndicator;