import React, { useState } from 'react';
import { View, StyleSheet, Modal, Button, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import AppText from './AppText';
import { TouchableWithoutFeedback } from 'react-native';
import Screen from './Screen';
import PickerItem from './PickerItem';

export default function AppPicker({
	icon,
	placeholder,
	items,
	onSelectItem,
	selectedItem,
	width = '100%',
}) {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<>
			<TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
				<View style={[styles.container, { width }]}>
					{icon && (
						<MaterialCommunityIcons
							name={icon}
							size={20}
							color={colors.medium}
							style={styles.icon}
						/>
					)}
					{selectedItem ? (
						<AppText style={styles.text}>
							{selectedItem.label}
						</AppText>
					) : (
						<AppText style={styles.placeholder}>
							{placeholder}
						</AppText>
					)}
					<MaterialCommunityIcons
						name='chevron-down'
						size={20}
						color={colors.medium}
					/>
				</View>
			</TouchableWithoutFeedback>
			<Modal visible={modalVisible} animationType='slide'>
				<Screen>
					<Button
						title='Close'
						onPress={() => setModalVisible(false)}
					/>
					<FlatList
						data={items}
						keyExtractor={item => item.value.toString()}
						renderItem={({ item }) => (
							<PickerItem
								label={item.label}
								onPress={() => {
									setModalVisible(false);
									onSelectItem(item);
								}}
							/>
						)}
					/>
				</Screen>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.light,
		borderRadius: 25,
		flexDirection: 'row',
		padding: 15,
		marginVertical: 15,
		alignItems: 'center',
	},
	icon: {
		marginRight: 10,
	},
	placeholder: {
		color: colors.medium,
	},
	text: {
		flex: 1,
	},
});
