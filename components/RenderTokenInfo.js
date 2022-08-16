import {View, Text, StyleSheet, Image} from "react-native"

export default function RenderTokenInfo({token}) {
    return (
        <View style={styles.tokenContainer}>
            <View style={styles.tokenInfoContainer}>
                <View style={styles.tokenImageContainer}>
                    <Image style={styles.tokenImage} source={{uri: token.logo_url}}/>
                    <Image style={styles.tokenCoinImage} source={{uri: token.logo_url}}/>
                </View>
                <View style={styles.tokenInfo}>
                    <Text style={styles.tokenName}>{token.name}</Text>
                    <Text style={styles.tokenSymbol}>{token.symbol}</Text>
                </View>
            </View>
            <View style={styles.tokeValueContainer}>
                <Text style={styles.totalValue}>${token.total_value}</Text>
                <Text style={styles.actualBalance}>{token.actual_balance}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tokenContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "#CCCCCC",
        borderBottomWidth: 1,
        paddingVertical: 5
    },
    tokenInfoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
        // width: "50%"
    },
    tokenImageContainer: {
        padding: 10
    },
    tokenImage: {
        height: 40,
        width: 40,
        resizeMode: "stretch"
    },
    tokenCoinImage: {
        position: "relative",
        top: -10,
        left: 30,
        height: 15,
        width: 15,
        resizeMode: "stretch"
    },
    tokenInfo: {
        marginLeft: 10
    },
    tokeValueContainer: {
        paddingRight: 10
    },
    tokenName: {
        fontWeight: "600",
        fontSize: 15
    },
    tokenSymbol: {
        fontSize: 10,
        color: "grey"
    },
    totalValue: {
        fontWeight: "600",
        fontSize: 15
    },
    actualBalance: {
        fontSize: 10,
        color: "grey"
    }
})
