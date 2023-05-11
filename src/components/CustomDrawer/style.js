import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  hero: {
    width: 130,
    height: 130,
    borderWidth: 1.7,
    borderColor: 'white',
    borderRadius: 100,
  },
  container: {
    backgroundColor: '#F2F2F2',
    borderTopRightRadius: 30,
  },
  containerHero: {
    backgroundColor: '#6A4029',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    height: 300,
    marginTop: -33,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  email: {
    fontSize: 15,
    fontWeight: '400',
    opacity: 0.75,
    color: '#ffffff',
  },
  phone: {
    fontSize: 15,
    fontWeight: '400',
    opacity: 0.75,
    color: '#ffffff',
  },
  itemList: {
    color: '#6A4029',
    fontSize: 17,
    fontWeight: '600',
    paddingLeft: 10,
  },
  lineBottom: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#6A4029',
    width: '60%',
    marginLeft: 62,
    marginVertical: 25,
    // marginBottom: 25,
  },
});

export default styles;
