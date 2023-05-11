import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cardWrap: {
    display: 'flex',
    width: Dimensions.get('window').width / 1,
    padding: 15,
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 0.4,
    borderColor: '#000',
    height: 120,
    width: '100%',
    borderRadius: 30,
    marginTop: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  hero: {
    width: 95,
    height: 95,
    borderRadius: 100,
    // marginTop: 1,
  },
  title: {
    fontWeight: '700',
    fontSize: 17,
    color: '#000',
  },
  price: {
    fontWeight: '400',
    fontSize: 15,
    color: '#895537',
  },
  addItem: {
    backgroundColor: '#FFBA33',
    borderColor: '#FFBA33',
    color: '#000',
    paddingLeft: 94,
    paddingRight: 94,
    padding: 20,
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  confirmAndCheckout: {
    paddingLeft: 65,
    paddingRight: 65,
    padding: 20,
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default styles;
