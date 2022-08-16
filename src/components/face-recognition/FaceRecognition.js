import React from "react";

const FaceRecognition = ({imageURL}) => {
    return (
        <div className={'center ma'}>
            <div className={'absolute mt2'}>
                <img alt={''} src={imageURL} width={'650'} height={'auto'} className={"z-1"}/>
            </div>
        </div>
    )
}

export default FaceRecognition;