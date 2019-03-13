import React from 'react';

import { Text } from 'react-native';

// sem classe = sem estado
const Product = ({ navigation }) => {
    return (
      <Text>
        Text
      </Text>
    );
};

Product.navigationOptions = ({ navigation }) => ({
  title: navigation.state.params.product.title
});

export default Product;