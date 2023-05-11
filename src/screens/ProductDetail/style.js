import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  hero: {
    // marginTop: 50,
    // width: 300,
    // height: 300,
    width: '100%',
    height: '100%',
    // position: 'absolute',
    // marginTop: 10,
    // zIndex: 2,
    resizeMode: 'cover',
    borderRadius: 200,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    marginTop: -40,
    color: '#000000',
    textAlign: 'center',
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#6A4029',
    marginTop: 10,
    textAlign: 'center',
  },
  deliveryInfo: {
    fontSize: 17,
    fontWeight: '900',
    marginTop: 20,
    color: '#000000',
  },
  deliveryText: {
    fontSize: 15,
    fontWeight: '400',
    marginTop: 10,
    lineHeight: 20,
  },
  description: {
    fontSize: 17,
    fontWeight: '900',
    marginTop: 10,
    color: '#000000',
  },
  descriptionText: {
    fontSize: 15,
    fontWeight: '400',
    marginTop: 10,
    textAlign: 'justify',
    lineHeight: 20,
  },
  addToCart: {
    marginTop: 30,
    paddingLeft: 110,
    paddingRight: 110,
    padding: 20,
    fontSize: 17,
    fontWeight: '700',
  },
  imgContainer: {
    width: 300,
    height: 300,
    borderWidth: 1,
    borderColor: 'white',
    // borderRadius: 100,
    marginTop: 40,
    marginBottom: 90,
    // position: 'absolute',
    // top: -5,
    // zIndex: 4,
  },
});

export default styles;
