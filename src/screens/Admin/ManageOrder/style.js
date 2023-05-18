import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cardWrap: {
    display: 'flex',
    width: Dimensions.get('window').width / 1.5,
    padding: 15,
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    // elevation: 10,
    height: 102,
    width: 315,
    borderRadius: 30,
    marginVertical: 7,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 10,
    // gap: 10,
  },
  hero: {
    width: 95,
    height: 95,
    // marginTop: 35,
    borderRadius: 100,
  },
  header: {
    // fontWeight: '900',
    fontFamily: 'Poppins-Black',
    fontSize: 34,
    // marginTop: 15,
    color: '#000000',
  },
  title: {
    fontSize: 17,
    // fontWeight: '700',
    fontFamily: 'Poppins-Bold',
    color: '#000000',
  },
  price: {
    // fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#895537',
  },
  status: {
    // fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#6A4029',
  },
  manageOrder: {
    // marginTop: 30,
    // paddingLeft: 103,
    // paddingRight: 103,
    padding: 20,
    fontSize: 17,
    textAlign: 'center',
    // fontWeight: '700',
    fontFamily: 'Poppins-Bold',
    backgroundColor: '#6A4029',
    borderColor: '#6A4029',
    color: 'white',
  },
});

export default styles;
