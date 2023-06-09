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
  saveChange: {
    textAlign: 'center',
    marginTop: 30,
    padding: 20,
    fontSize: 17,
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
    position: 'relative',
    // top: -5,
    // zIndex: 4,
  },
  navbar: {
    height: 90,
    width: '90%',
    backgroundColor: '#ffffff',
    // borderBottomEndRadius: 15,
    // borderBottomStartRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingRight: 46,
    // paddingLeft: 46,
    // elevation: 10,
  },
  chevron: {
    marginTop: 49.5,
    // width: 20,
    // height: 16,
  },
  cart: {
    marginTop: 45,
    width: 50,
    height: 50,
    position: 'relative',
    borderRadius: 100,
    backgroundColor: '#6A4029',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImage: {
    borderRadius: 100,
    backgroundColor: '#895537',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 45,
  },
  choosePhoto: {
    textAlign: 'center',
    backgroundColor: '#895537',
    borderColor: '#895537',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  takePhoto: {
    textAlign: 'center',
    backgroundColor: '#FFBA33',
    color: '#000',
    borderColor: '#FFBA33',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  closeHandler: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#DC143C',
  },
});

export default styles;
