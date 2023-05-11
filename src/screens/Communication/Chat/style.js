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
    elevation: 10,
    height: 102,
    width: 315,
    borderRadius: 30,
    marginTop: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  hero: {
    borderRadius: 60,
    borderWidth: 1.5,
    borderColor: '#6A4029',
    width: 60,
    height: 60,
  },
  header: {
    fontWeight: '900',
    fontSize: 34,
    marginTop: 60,
  },
  searchIcon: {
    width: 18,
    height: 18,
    position: 'absolute',
    top: 46,
    left: 22,
    zIndex: 2,
  },
  searchInput: {
    borderRadius: 15,
    width: 300,
    height: 50,
    marginTop: 30,
    marginBottom: 20,
    borderWidth: 0.3,
    paddingLeft: 52,
    backgroundColor: '#EFEEEE',
    fontSize: 17,
  },
});

export default styles;
