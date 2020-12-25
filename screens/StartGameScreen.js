import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
} from 'react-native';
import colors from '../constants/colors';
import Card from './../components/Card';
import Input from './../components/Input';
import NumberContainer from './../components/NumberContainer';
import BodyText from './../components/BodyText';
import TitleText from '../components/TitleText';

const StartGameScreen = (props) => {
	const { onStartGame } = props;

	const [enteredValue, setEnteredValue] = useState('');
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState();

	const numberInputHandler = (inputText) => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ''));
	}

	const onConfirmPress = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber < 1 || chosenNumber > 99) {
			Alert.alert('Invalid number', 'Number has to be a number between 1 and 99', [{
				text: 'Okay',
				style: 'destructive',
				onPress: onResetPress,
			}])
			return;
		}
		setSelectedNumber(chosenNumber);
		setEnteredValue('');
		setConfirmed(true);
		Keyboard.dismiss();
	}

	const onResetPress = () => {
		setEnteredValue('');
		setConfirmed(false);
	}

	let confirmedOutput;
	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<BodyText>You selected</BodyText>
				<NumberContainer>
					{selectedNumber}
				</NumberContainer>
				<Button title='START GAME' onPress={() => onStartGame(selectedNumber)} />
			</Card>
		);
	}

	return (
		<TouchableWithoutFeedback onPress={() => {
			Keyboard.dismiss();
		}}>
			<View style={styles.screen}>
				<TitleText style={styles.title}>
					Start a New Game!
				</TitleText>
				<Card style={styles.inputContainer}>
					<BodyText style={styles.text}>Select a Number</BodyText>
					<Input
						style={styles.input}
						blurOnSubmit
						autoCapitalize='none'
						autoCorrect={false}
						keyboardType='number-pad'
						maxLength={2}
						value={enteredValue}
						onChangeText={numberInputHandler}
					/>
					<View style={styles.buttonContainer}>
						<View style={styles.button}>
							<Button
								title='Reset'
								onPress={onResetPress}
								color={colors.accent}
							/>
						</View>
						<View style={styles.button}>
							<Button
								title='Confirm'
								onPress={onConfirmPress}
								color={colors.primary}
							/>
						</View>
					</View>
				</Card>

				{confirmedOutput}
			</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: 'open-sans-bold',
	},
	input: {
		width: 50,
		textAlign: 'center',
	},
	inputContainer: {
		width: 300,
		maxWidth: '80%',
		alignItems: 'center',
	},
	button: {
		width: 100,
	},
	buttonContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
	},
	summaryContainer: {
		marginTop: 20,
		alignItems: 'center',
	},
	text: {
		fontFamily: 'open-sans',
	},
});

export default StartGameScreen;
