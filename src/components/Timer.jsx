import { useState, useEffect } from "react";

const Timer = ({ timeout, onTimeout }) => {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timer=setTimeout(onTimeout, timeout);

        return () => clearTimeout(timer);

    }, [onTimeout, timeout]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 100);
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <progress id="question-time" max={timeout} value={remainingTime} >

        </progress>
    );
}

export default Timer;