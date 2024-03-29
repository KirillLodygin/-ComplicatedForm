import React, { useState } from 'react';
import {
	Typography,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
} from '@material-ui/core';
import { InsertDriveFile } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { MainContainer } from './components/MainContainer';
import { PrimaryButton } from './components/PrimaryButton';
import { useData } from '../DataContext';
import swal from 'sweetalert';

const useStyles = makeStyles({
	root: {
		marginTop: '15px',
		marginBottom: '30px',
	},

	table: {
		marginBottom: '30px',
	},
});

export const Result = () => {
	const styles = useStyles();
	const [success, setSuccess] = useState(false);

	const { data } = useData();
	const entries = Object.entries(data).filter((entry) => entry[0] !== 'files');
	if (!data.hasPhone && entries.length === 5) {
		entries.splice(4, 1);
		delete data.phoneNumber;
	}

	const { files } = data;

	const onSubmit = async () => {
		const formData = new FormData();

		if (data.files) {
			data.files.forEach((file) => {
				formData.append('files', file, file.name);
			});
		}

		entries.forEach((entry) => {
			formData.append(entry[0], entry[1]);
		});

		const res = await fetch('http://localhost:4000/', {
			method: 'POST',
			body: formData,
		});

		if (res.status === 200) {
			swal('Good job!', "You've passed the challenge!", 'success');
			setSuccess(true);
		}
	};

	return (
		<MainContainer>
			<Typography component="h2" variant="h5">
				&#128221; Form Values
			</Typography>

			<TableContainer className={styles.root} component={Paper}>
				<Table className={styles.table}>
					<TableHead>
						<TableRow>
							<TableCell>Field</TableCell>
							<TableCell align="right">Value</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{entries.map((entry) => (
							<TableRow key={entry[0]}>
								<TableCell>{entry[0]}</TableCell>
								<TableCell align="right">
									{typeof entry[1] !== 'boolean'
										? entry[1].toString()
										: entry[1]
										? '✅'
										: '❎'}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{files && (
				<>
					<Typography component="h2" variant="h5">
						&#128230; Files
					</Typography>

					<List>
						{files.map((f, index) => (
							<ListItem key={index}>
								<ListItemIcon />
								<InsertDriveFile />
								<ListItemText primary={f.name} secondary={f.size} />
							</ListItem>
						))}
					</List>
				</>
			)}

			<PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>

			<Link to="/">Start over</Link>
		</MainContainer>
	);
};
