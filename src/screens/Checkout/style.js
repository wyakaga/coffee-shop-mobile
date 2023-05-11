import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cardWrap: {
    display: 'flex',
    width: Dimensions.get('window').width / 1.5,
    padding: 15,
    alignItems: 'center',
  },
  card: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    elevation: 10,
    height: 156,
    width: 315,
    borderRadius: 30,
    marginTop: 15,
    paddingLeft: 30,
    paddingRight: 50,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    position: 'relative',
  },
  title: {
    fontWeight: '900',
    fontSize: 34,
    marginTop: 30,
  },
  address: {
    fontWeight: '700',
    fontSize: 17,
    color: '#000000',
  },
  change: {
    fontSize: 15,
    fontWeight: '400',
    color: '#6A4029',
    marginLeft: 135,
  },
  radioButtons: {
    marginLeft: -20,
    alignItems: 'flex-start',
  },
  delivery: {
    fontWeight: '700',
    fontSize: 17,
    color: '#000000',
  },
  total: {
    fontSize: 18,
    fontWeight: '500',
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    // marginLeft: 140,
  },
  confirmAndCheckout: {
    marginTop: 110,
    marginBottom: 30,
    paddingLeft: 65,
    paddingRight: 65,
    padding: 20,
    fontSize: 17,
    fontWeight: '700',
  },
});

export default styles;
