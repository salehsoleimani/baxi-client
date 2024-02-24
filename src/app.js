// App.jsx
import React, {Fragment} from 'react';
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Loading from "./components/ui/Loading";

export default function App() {
    return (
        <Fragment>
            <Input placeholder="نام خانوادگی"/>
            <Button type="tonal">ادامه</Button>
            <Loading/>
        </Fragment>
    );
}