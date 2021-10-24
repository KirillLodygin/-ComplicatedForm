import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Form } from './components/Form';
import { MainContainer } from './components/MainContainer';
import { PrimaryButton } from './components/PrimaryButton';
import { FileInput } from './components/FileInput';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useData } from '../DataContext';

export const Step3 = () => {
	const history = useHistory();

	const { data, setValues } = useData();

	const { control, handleSubmit } = useForm({
		defaultValues: { files: data.files },
	});

	const onSubmit = (data) => {
		history.push('/result');
		setValues(data);
	};

	return (
		<MainContainer>
			<Typography component="h2" variant="h5">
				&#128752; Step 3
			</Typography>

			<Form onSubmit={handleSubmit(onSubmit)}>
				<FileInput control={control} name="files" />

				<PrimaryButton>Next</PrimaryButton>
			</Form>
		</MainContainer>
	);
};
