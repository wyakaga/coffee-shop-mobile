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
    // fontWeight: '900',
    fontFamily: 'Poppins-Black',
    marginTop: -40,
    color: '#000000',
    textAlign: 'center',
  },
  price: {
    fontSize: 22,
    // fontWeight: '700',
    fontFamily: 'Poppins-Bold',
    color: '#6A4029',
    marginTop: 10,
    textAlign: 'center',
  },
  deliveryInfo: {
    fontSize: 17,
    // fontWeight: '900',
    fontFamily: 'Poppins-Black',
    marginTop: 20,
    color: '#000000',
  },
  deliveryText: {
    fontSize: 15,
    // fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
    lineHeight: 20,
  },
  description: {
    fontSize: 17,
    // fontWeight: '900',
    fontFamily: 'Poppins-Black',
    marginTop: 10,
    color: '#000000',
  },
  descriptionText: {
    fontSize: 15,
    // fontWeight: '400',
    fontFamily: 'Poppins-Regular',
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
    // fontWeight: '700',
    fontFamily: 'Poppins-Bold',
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
  navbar: {
    height: 90,
    width: '100%',
    backgroundColor: '#ffffff',
    // borderBottomEndRadius: 15,
    // borderBottomStartRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingRight: 46,
    // paddingLeft: 46,
    // elevation: 10,
  },
  chevron: {
    marginTop: 49.5,
    width: 20,
    height: 16,
  },
  cart: {
    marginTop: 45,
    width: 22,
    height: 22,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: -12,
    backgroundColor: 'red',
    borderRadius: 60,
    width: 20,
    height: 20,
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
});

export default styles;
