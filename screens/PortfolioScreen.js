import {View, Text, ImageBackground, StyleSheet, Dimensions, SafeAreaView, FlatList} from "react-native"
import {getData} from "../apiService";
import {useEffect, useState} from "react";
import RenderTokenInfo from "../components/RenderTokenInfo";
import CheckBox from "react-native-check-box";

export default function PortfolioScreen() {

    const [tokenData, setTokenData] = useState([])
    const [filteredTokenData, setFilteredTokenData] = useState([])
    const [isDataLoading, setIsdataLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(true);

    useEffect(() => {
        fetchData();
    }, [])

    function fetchData() {
        getData().then(function (response) {
            console.log(response.data);
            let data = response.data
            let tokenHoldings = [];
            if (response.data) {
                for (const chain_portfolio of data.record.chain_portfolios) {
                    for (const token_holding of chain_portfolio.token_holdings) {
                        tokenHoldings.push(token_holding)
                    }
                }
                setTokenData(tokenHoldings);
                let filteredTokens = tokenHoldings.filter(token => token.is_verified)
                setFilteredTokenData(filteredTokens);
                setIsdataLoading(false);
            }
        }.bind(this)).catch(function (error) {
            console.log(error)
        })
    }

    function applyFilter() {
        let filteredTokens = tokenData.filter(token => token.is_verified == !isVerified)
        setFilteredTokenData(filteredTokens);
        setIsVerified(!isVerified)
    }

    const Banner = () => {
        return (
            <View style={styles.mainImageContainer}>
                <ImageBackground source={require('../assets/images/wallet-background.png')}
                                 style={styles.bannerImage}>
                    <Text style={styles.totalBalanceText}>Total Balance</Text>
                    <Text style={styles.totalBalance}>$89.87</Text>
                    <Text style={styles.loadWalletText}>Load Wallet</Text>
                </ImageBackground>
            </View>
        )
    }


    const LastUpdated = () => {
        return (
            <View style={styles.lastUpdatedContainer}>
                <View style={styles.lastUpdated}>
                    <Text style={styles.lastUpdatedText}>Last Updated: <Text style={styles.lastUpdatedValue}>4 mins
                        ago</Text></Text>
                </View>
                <View style={styles.isVerifiedFilter}>
                    <View>
                        <CheckBox
                            style={{flex: 1, padding: 10}}
                            onClick={() => {
                                applyFilter()
                            }}
                            isChecked={isVerified}
                        />
                    </View>
                    <View>
                        <Text style={styles.filterText}>Only verified coins</Text>
                    </View>
                </View>
            </View>
        )
    }

    const TokenInfo = ({item}) => {
        return (
            <View style={styles.tokenInfoContainer}>
                <RenderTokenInfo token={item}/>
            </View>
        )
    }


    return (
        isDataLoading ? <View><Text>Loading...</Text></View> : <View style={styles.container}>
            <Banner/>
            <LastUpdated/>
            <SafeAreaView style={{flex: 1, marginTop: 3}}>
                <FlatList
                    data={filteredTokenData}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    renderItem={TokenInfo}
                    keyExtractor={item => `${item.symbol}`}
                />
            </SafeAreaView>
        </View>
    )
}
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height - height / 4.5,
        backgroundColor: "white"
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    mainImageContainer: {
        height: '30%',
        width: '100%',
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 1
    },
    bannerImage: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        height: '100%',
        width: '105%',
        resizeMode: 'stretch'
    },
    totalBalanceText: {
        marginTop: 50
    },
    totalBalance: {
        fontWeight: "bold",
        fontSize: 30
    },
    loadWalletText: {
        backgroundColor: "#F4D03F",
        width: 100,
        textAlign: "center",
        borderRadius: 10,
        padding: 5,
        fontSize: 12,
        fontWeight: "600",
        color: "#2C3E50",
        marginTop: 10
    },
    lastUpdatedContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        // alignItems: "center",
        paddingHorizontal: 5,
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 1,
        paddingVertical: 9,
        color: "grey"
    },
    lastUpdated: {},
    isVerifiedFilter: {
        flexDirection: "row",
        // alignItems: "center"
    },
    lastUpdatedText: {
        fontSize: 12
    },
    lastUpdatedValue: {
        fontSize: 10
    },
    filterText: {
        fontSize: 12
    },
    tokenInfoContainer: {}

})
