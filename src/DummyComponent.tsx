import React, {useState} from "react";

const DummyComponent = ({value, setValue}:any) => {

    const handleChange = (event:any) => {
        console.log('coming in onChange', event.target.value)
        setValue(event.target.value);
    };

    return(<>
            <input
                type={"text"}
                value={value}
                onChange={handleChange}
                data-testid={'input-element'}/>

    </>)
};

export default DummyComponent
