// hooks
import { useEffect, useState } from "react";
import useUrl from "../../hooks/useUrl";

// styles
import styles from "./LoginForm.module.css";
import Button from "../ui/Button";
import Input from "../ui/Input";
import {useNavigate, useOutletContext} from "react-router-dom";
import ErrorMessage from "../ui/ErrorMessage";

// logo and icons
// import mobileIcon from "../../assets/icons/mobile.svg";

// components
// import Input from "../UI/Input";
// import Button from "../UI/Button";
// import ErrorMessage from "../UI/ErrorMessage";
// import { useNavigate, useOutletContext } from "react-router-dom";

const LoginForm = ({ phoneNumber, setPhoneNumber }) => {
	const { isLoading, setIsLoading } = useOutletContext();

	const BASE_URL = useUrl();
	const [hasError, setHasError] = useState(false);
	const navigate = useNavigate();

	const inputChangeHandler = (e) => {
		setPhoneNumber(e.target.value);
	};
	const phoneValidate = () => {
		if (phoneNumber.length < 10 || phoneNumber.length > 13) {
			setHasError(true);
			return false;
		} else {
			return true;
		}
	};

	useEffect(() => {
		setPhoneNumber("");
	}, [setPhoneNumber]);

	const submitHandler = (e) => {
		e.preventDefault(); // stop page refresh
		setHasError(false);
		if (!phoneValidate()) return;
		const userPhone = {
			phone_number: phoneNumber,
		};
	};

	return (
		<form className={styles.loginForm} onSubmit={submitHandler}>
			<label className="caption-lg" htmlFor="phone-number">
				شماره موبایل
			</label>
			<div className={styles.inputField}>
				{/*<img*/}
				{/*	src={mobileIcon}*/}
				{/*	className={styles.mobileIcon}*/}
				{/*	alt="mobile icon"*/}
				{/*/>*/}
				<Input
					type="text"
					value={phoneNumber}
					onChange={inputChangeHandler}
					placeholder="شماره موبایل خود را وارد کنید"
					id="phone-number"
				/>
				{hasError && (
					<ErrorMessage>شماره وارد شده نامعتبر است</ErrorMessage>
				)}
			</div>

			<Button isSmall={true} type="primary">
				ورود به حساب کاربری
			</Button>
		</form>
	);
};

export default LoginForm;
