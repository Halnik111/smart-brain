import React from "react";

const CelebrityRecognition = ({celebrity}) => {
    const isCelebrity = () => {
        if (celebrity[0].value * 100 > 30) {
            return `On picture is probably ${celebrity[0].name}. Probability:${celebrity[0].value * 100}%`;
        }
    }

    return (
        <div>
            <h2>{isCelebrity()}</h2>
        </div>
    )
}

export default CelebrityRecognition;