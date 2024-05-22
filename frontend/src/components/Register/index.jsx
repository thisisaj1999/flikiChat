import React, { useEffect, useState } from "react";
import styles from "./Register.module.scss";
import { Form } from "antd";

// Components
import StepOne from "./layouts/StepOne";
import StepFinal from "./layouts/StepFinal";

// Hooks
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useGlobalStore } from '../../utils/store'

// APIs
import { registerUser, getGroups } from "../../utils/requests"

// Other functions
import { getRandomColor, storeUserData } from "../../utils/other";


const index = () => {

	const Update = {
		GlobalStore: {
			isAuthenticated: useGlobalStore((State) => State.setIsAuthenticated),
		},
	};
	
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	// Data
	const [formData, setFormData] = useState({});
	const [initialGroups, setInitialGroups] = useState([])

	// Layout or UI
	const [step, setStep] = useState(1);
	const [isHovered, setIsHovered] = useState(false);

	
	// UI
	const hoveredStyle = {
		color: getRandomColor(),
		transition: "all 0.3s ease-in-out",
	};

	const notHoveredStyle = {
		color: "black",
		transition: "all 1s ease-in-out",
	};


	//  Button Handlers
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
			storeUserData(response)
			localStorage.setItem('isAuth', true);
			Update.GlobalStore.isAuthenticated(true)
			navigate("/dashboard");
			enqueueSnackbar("Sign Up successfull", { variant: 'success' });
		}
		console.log("Final Form Data:", finalData);
	};

	// Initial Groups on Load
	useEffect(() => {
		const getAllGroups = async () => {
			const response = await getGroups();
			if (response?.status === 200) {
				setInitialGroups([...initialGroups, ...response?.data?.group_table])
			}
		};

		getAllGroups();
	}, []);

	// Components
	const steps = [
		<StepOne key="1" form={form} handleNext={handleNext} />,
		<StepFinal
			key="2"
			form={form}
			handleBack={handleBack}
			handleConfirm={handleConfirm}
			groups={initialGroups}
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
