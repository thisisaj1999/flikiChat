import React, { useEffect, useState } from "react";

// ANTD
import { Form } from "antd";

// Components
import StepOne from "./steps/StepOne";
import StepFinal from "./steps/StepFinal";
import WHeader from "../../../components/Form/WHeader";

// Hooks
import { useSnackbar } from "notistack";
import { useAuth } from "../../../utils/AuthProvider";

// API functions
import { getGroups } from "../../../utils/requests"


const index = () => {
	const Auth = useAuth()
	
	const [form] = Form.useForm();
	const { enqueueSnackbar } = useSnackbar();

	// Data
	const [formData, setFormData] = useState({});
	const [initialGroups, setInitialGroups] = useState([])
	const [loadingResponse, setLoadingResponse] = useState(false);

	// Layout or UI
	const [step, setStep] = useState(1);

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
		setLoadingResponse(true)
		const finalData = {
			...formData,
			...values,
		};
		setFormData(finalData);
		const response = await Auth.registerUser(finalData)
		if (response?.status === 200) {
			setLoadingResponse(false)
			enqueueSnackbar("Welcome to Fliki Chat", { variant: 'success' });
		}else{
			setLoadingResponse(false)
			enqueueSnackbar(response?.message, { variant: 'info' });
			setStep(1)
		}
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

	// Form Step Components
	const steps = [
		<StepOne key="1" form={form} handleNext={handleNext} />,
		<StepFinal
			key="2"
			form={form}
			handleBack={handleBack}
			handleConfirm={handleConfirm}
			groups={initialGroups}
			loadingResponse={loadingResponse}
		/>,
	];

	return (
		<WHeader width={step === 1 ? '25rem' : '45rem'} comp={"Register"}>
			{steps[step - 1]}
		</WHeader>
	);
};

export default index;
