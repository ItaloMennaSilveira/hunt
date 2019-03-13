import React, { Component } from "react";
import api from '../services/api';

import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

export default class Main extends Component {
  static navigationOptions = {
    title: "App da Alegria",
    headerStyle: {
      backgroundColor: "#DA552F"
    },
    headerTintColor: "#FFF"
  };

  // ouvir as alteracoes e dale render de novo
  state = {
    productInfo: {},
    docs: [],
    page: 1
  };

  // chamando quando eh montado (padrao react)
  componentDidMount(){
    this.loadProducts();
  }

  // arrow function que nao eh padrao pra conseguir usar o this
  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    const { docs, ...productInfo } = response.data;

    this.setState({ 
      docs: [...this.state.docs, ...docs],
      productInfo,
      page
    });
  };

  loadMore = () => {
    const { page, productInfo } = this.state;

    if (page === productInfo.pages) {
      console.log("page(" + page + ") == productInfo.pages(" + productInfo.pages + ")" );

      return;
    }

    const pagNumber = page + 1;
    console.log("page(" + pagNumber + ") != productInfo.pages(" + productInfo.pages + ")" );

    this.loadProducts(pagNumber);
  };

  renderItem = ({ item }) => (
    <View style={styles.productContainer}>
     <Text style={styles.productTitle}> {item.title} </Text>
     <Text style={styles.productDescription}> {item.description} </Text>
     <TouchableOpacity 
      style={styles.productButton} 
      onPress={() => {
        this.props.navigation.navigate("Product", { product: item});
      }}>
       <Text style={styles.productButtonText}> Acessar </Text>
     </TouchableOpacity>
    </View>
  );

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          data={this.state.docs}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.1} //90% de scroll, carrega mais...
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },

  list: {
    padding: 20
  },

  productContainer: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20
  },

  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },

  productDescription: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24
  },

  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#DA552F',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },

  productButtonText: {
    fontSize: 16,
    color: '#DA552F',
    fontWeight: "bold"
  }
});