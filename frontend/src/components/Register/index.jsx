import React, { useState } from "react";
import styles from "./Register.module.scss";
import StepOne from "./layouts/StepOne";
import StepFinal from "./layouts/StepFinal";

import { Form } from "antd";

// Hooks
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

// Other functions
import { getRandomColor } from "../../utils/other";

// APIs
import { registerUser } from "../../utils/requests"

const index = () => {
	const [formData, setFormData] = useState({});
	const [step, setStep] = useState(1);
	const { enqueueSnackbar } = useSnackbar();
	const [form] = Form.useForm();
	const [isHovered, setIsHovered] = useState(false);
	const navigate = useNavigate();

	const hoveredStyle = {
		color: getRandomColor(),
		transition: "all 0.3s ease-in-out",
	};

	const notHoveredStyle = {
		color: "black",
		transition: "all 1s ease-in-out",
	};

	const handleNext = (values) => {
		setFormData({
			...formData,
			...values,
		});
		setStep(step + 1);
	};

	const handleBack = () => {
		setStep(step - 1);
	};

	const handleConfirm = async (values) => {
		const finalData = {
			...formData,
			...values,
		};
		setFormData(finalData);
		const response = await registerUser(finalData)
		if (response?.status === 200) {
			navigate("/dashboard");
		}
		console.log("Final Form Data:", finalData);
	};

	const steps = [
		<StepOne key="1" form={form} handleNext={handleNext} />,
		<StepFinal
			key="2"
			form={form}
			handleBack={handleBack}
			handleConfirm={handleConfirm}
		/>,
	];

	return (
		<div className={styles.AuthBgMain}>
			<div
				className={styles.AuthFormMain}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				style={step === 1 ? { width: "25rem" } : { width: "45rem" }}
			>
				<h1 className={styles.AuthFormHeading}>
					Regis
					<span style={isHovered ? hoveredStyle : notHoveredStyle}>
						ter
					</span>
				</h1>
				{steps[step - 1]}
			</div>
		</div>
	);
};

export default index;
