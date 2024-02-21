// App.jsx
import React, {Fragment} from 'react';
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";

export default function App() {
    return (
        <Fragment>
            <Input placeholder="نام خانوادگی"/>
            <Button>ادامه</Button>
        </Fragment>
    );
}