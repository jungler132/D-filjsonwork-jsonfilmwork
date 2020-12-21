import React, { Component } from 'react';
import { View,Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image, Modal} from 'react-native';

class ViewStyle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movieName:"kung fu",
            dataBase: [],
            modalWindow:false,
            temp:[]

        }
    }
    noImg = "https://tl.rulate.ru/i/book/19/10/18925.jpg"
    componentDidMount = async () => {
        this.getMovieData()
    }
    getMovieData = async () => {
            try{
                const answer = await fetch(`http://api.tvmaze.com/search/shows?q=${this.state.movieName}`)
                const dataBase = await answer.json()
                this.setState({ dataBase })
                console.log(dataBase)
            }
            catch (e){
                console.log("ERROR INCORRECT URL")
            }
    }
    searchOperation = (text) => {
        //В конце ввода должен менять стейт movieName:"Matrix" на вписанный в TextInput
        this.setState({movieName : text})
    }
    render() {
        return (
            <View style={{flex:1 , backgroundColor:"red"}}>
                <View style={{flex:0.3 , backgroundColor:"white"}}>
                <Text style={{fontSize:45 , color:"teal"}}>
                    byInst : @dreame134
                </Text>
                <TouchableOpacity onPress={this.getMovieData} style={{flex:0.5 , backgroundColor:"teal" , alignItems:"center" , justifyContent:"center"}}>
                    <Text style={{fontSize:35 , color:"white"}}>
                    PUSH TO FIND
                    </Text>
                </TouchableOpacity>
                <TextInput onChangeText={text => this.searchOperation(text)} placeholder="Tap here" placeholderTextColor="teal" style={{alignItems:"center" , justifyContent:"center" , backgroundColor:"white" , fontSize:25}}/>
                </View >
                <View style={{flex:0.7 , backgroundColor:"teal", alignItems:"center" , justifyContent:"center"}}>
                <ScrollView style={{flex:1}}>
                <Text style={{fontSize:25 ,alignItems:"center" , justifyContent:"center"}}>
                    SEARCH RESULTS :
                </Text>
                {this.state.dataBase.map((item,index) => (
                <View key={index} style={{flex:0.7,alignItems:"center" , justifyContent:"center"}}>
                <Image source={{uri: item?.show?.image?.medium ?? this.noImg}} style={{width:150,height:200 , backgroundColor:"purple" , borderRadius:90}}/>
                <Text style={{fontSize:25 , color:"white", alignItems:"center" , justifyContent:"center"}}>
                    {item.show.name}
                </Text>
                <TouchableOpacity onPress={() => {this.setState({modalWindow:true , temp : item})}} style={{flex:0.5,backgroundColor:"#000000aa" , borderRadius:10}}>
                    <Text>
                        Movie Stats
                    </Text>
                </TouchableOpacity>
                </View>))}
                </ScrollView>
                <Modal transparent={true} visible={this.state.modalWindow}>
                    <View style={{flex:1 , backgroundColor:"#000000aa"}}>
                        <View style={{flex:0.6,backgroundColor:"#ffffff",margin:50,padding:40,borderRadius:20}}>
                            <TouchableOpacity onPress={() => {this.setState({modalWindow:false})}} style={{alignItems:"flex-end"}}>
                                <Text>
                                    X
                                </Text>
                            </TouchableOpacity>
                            <Text>
                                nikak ne vidit {this.temp.show.id}
                            </Text>
                        </View>
                    </View>
                </Modal>
                </View >
            </View>
        );
    }
} 
export default ViewStyle
