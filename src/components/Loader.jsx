import React from 'react';
import { Oval } from 'react-loader-spinner'

const Loader = () => {
    return (
        <Oval
            height={80}
            width={80}
            color="#f87171"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="rgba(251, 146, 60, .5)"
            strokeWidth={3}
            strokeWidthSecondary={3}
        />

    )
}

export default Loader