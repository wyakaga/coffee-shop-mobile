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
    marginTop: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  hero: {
    width: 95,
    height: 95,
    marginTop: 35,
  },
  header: {
    // fontWeight: '900',
    fontFamily: 'Poppins-Black',
    fontSize: 34,
    marginTop: 15,
  },
  title: {
    fontSize: 17,
    // fontWeight: '700',
    fontFamily: 'Poppins-Bold',
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
  backToHome: {
    // marginTop: 30,
    paddingLeft: 103,
    paddingRight: 103,
    padding: 20,
    fontSize: 17,
    // fontWeight: '700',
    fontFamily: 'Poppins-Bold',
    backgroundColor: '#FFBA33',
    borderColor: '#FFBA33',
    color: '#6A4029',
  },
});

export default styles;
