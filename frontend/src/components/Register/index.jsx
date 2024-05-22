import React, { useState } from "react";
import styles from "./Register.module.scss";
import StepOne from "./layouts/StepOne";
import StepFinal from "./layouts/StepFinal";

import { Form } from "antd";

// Hooks
import { useNavigate, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";

// Other functions
import { getRandomColor } from "../../utils/other";

const index = () => {
	const [formData, setFormData] = useState({});
	const [step, setStep] = useState(1);
	const { enqueueSnackbar } = useSnackbar();
	const [form] = Form.useForm();
	const [isHovered, setIsHovered] = useState(false);

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
			[`step${step}`]: values,
		});
		setStep(step + 1);
	};

	const handleBack = () => {
		setStep(step - 1);
	};

	const handleConfirm = (values) => {
		const finalData = {
			...formData,
			stepFinal: values,
		};
		setFormData(finalData);
		// message.success("Form submitted successfully!");
		console.log("Final Form Data:", finalData);
	};

	const steps = [
		<StepOne key="1" form={form} handleNext={handleNext} />,
		<StepFinal key="2" form={form} handleBack={handleBack} handleConfirm={handleConfirm} />
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
