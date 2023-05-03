/** @format */

import styles from "./login.module.scss";
import { useEffect, useState } from "react";
import { Button } from "common/button";
import { TextField, TextFieldStatus } from "common/text-field";
import { ReactComponent as EyeSVG } from "../../assets/icons/eye.svg";
import { ReactComponent as ClosedEyeSVG } from "../../assets/icons/closed-eye.svg";
import { ReactComponent as xSVG } from "../../assets/icons/x.svg";
import { mailFormat, passwordFormat } from "../../helpers/utils.js";

type EmailType = {
	inputValueEmail: string;
	helperTextEmail: string;
	fieldStatusEmail: TextFieldStatus;
};

const initEmailState = {
	inputValueEmail: "",
	helperTextEmail: "",
	fieldStatusEmail: TextFieldStatus.default,
};

type PassType = {
	inputValuePass: string;
	helperTextPass: string;
	fieldStatusPass: TextFieldStatus;
};

const initPassState = {
	inputValuePass: "",
	helperTextPass: "",
	fieldStatusPass: TextFieldStatus.default,
};

type LoginFormType = {
	email: string;
	password: string;
};

const initLoginState = {
	email: "",
	password: "",
};

export const Login = () => {
	const [emailState, setEmailState] = useState<EmailType>(initEmailState);
	const [passState, setPassState] = useState<PassType>(initPassState);
	const [passHidden, setPassHidden] = useState("password");
	const [loginInfo, setLoginInfo] = useState<LoginFormType>(initLoginState);

	useEffect(() => {
		if (
			!emailState.inputValueEmail.match(mailFormat) &&
			emailState.inputValueEmail != ""
		) {
			setEmailState({
				...emailState,
				helperTextEmail: "Debe ser un email válido",
				fieldStatusEmail: TextFieldStatus.error,
			});
		} else {
			setEmailState({
				...emailState,
				helperTextEmail: "",
				fieldStatusEmail: TextFieldStatus.default,
			});
		}
	}, [emailState.inputValueEmail]);

	useEffect(() => {
		if (
			passState.inputValuePass.length < 8 &&
			passState.inputValuePass !== ""
		) {
			setPassState({
				...passState,
				helperTextPass: "La contraseña debe ser más larga que 8 caracteres",
				fieldStatusPass: TextFieldStatus.error,
			});
		} else if (
			!passState.inputValuePass.match(passwordFormat) &&
			passState.inputValuePass !== ""
		) {
			setPassState({
				...passState,
				helperTextPass:
					"La contraseña debe tener al menos un caracter especial y un caracter alfanumerico",
				fieldStatusPass: TextFieldStatus.error,
			});
		} else {
			setPassState({
				...passState,
				helperTextPass: "",
				fieldStatusPass: TextFieldStatus.default,
			});
		}
	}, [passState.inputValuePass]);

	let unmaskPass = function unmask() {
		if (passHidden === "text") return ClosedEyeSVG;
		else return EyeSVG;
	};

	useEffect(() => {
		localStorage.setItem(`${loginInfo.email}`, JSON.stringify(loginInfo));
	}, [loginInfo]);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.formDivision}>
					<div className={styles.formContainer}>
						<img
							src="src/assets/icons/barco.svg"
							alt="Imagen de un barco"
							className={styles.icono}
						/>

						<h1 className={styles.header1}>Iniciar sesión</h1>
						<section className={styles.textField}>
							<TextField
								status={emailState.fieldStatusEmail}
								name={"email"}
								onBlur={(e) =>
									setEmailState({
										...emailState,
										inputValueEmail: e.target.value,
									})
								}
								label="Usuario"
								type="email"
								helperText={emailState.helperTextEmail}
								helperIcon={xSVG}
							/>
						</section>

						<section className={styles.textField}>
							<TextField
								status={passState.fieldStatusPass}
								name={"password"}
								onBlur={(e) =>
									setPassState({
										...passState,
										inputValuePass: e.target.value,
									})
								}
								label="Contraseña"
								type={passHidden}
								rightIcon={unmaskPass()}
								onRightIconClick={() => {
									if (passHidden == "text") setPassHidden("password");
									else setPassHidden("text");
								}}
								helperText={passState.helperTextPass}
								helperIcon={xSVG}
								errorMsg={true}
							/>
						</section>

						<Button
							className={`${styles.btnIngresar} ${styles.textField}`}
							disabled={
								emailState.inputValueEmail === "" ||
								passState.inputValuePass === "" ||
								emailState.fieldStatusEmail === TextFieldStatus.error ||
								passState.fieldStatusPass === TextFieldStatus.error
							}
							onClick={() => {
								setLoginInfo({
									...loginInfo,
									email: emailState.inputValueEmail,
									password: passState.inputValuePass,
								});
							}}
						>
							Ingresar
						</Button>

						<a
							className={`${styles.textField} ${styles.link}`}
							href="http://www.google.com"
						>
							¿Olvidaste tu contraseña?
						</a>
					</div>
				</div>

				<div className={styles.imgDivision} />
			</div>
		</>
	);
};
