import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: '900',
    marginLeft: 40,
    marginTop: 30,
    color: '#000000',
  },
  searchIcon: {
    width: 18,
    height: 18,
    position: 'absolute',
    top: 46,
    left: 52,
    zIndex: 2,
  },
  searchInput: {
    borderRadius: 15,
    width: 330,
    height: 50,
    marginTop: 30,
    marginLeft: 35,
    marginBottom: 20,
    borderWidth: 0.3,
    borderColor: 'transparent',
    paddingLeft: 46,
    backgroundColor: '#EFEEEE',
    fontSize: 17,
  },
  breadcumb: {
    fontSize: 19,
    fontWeight: '700',
    color: '#9A9A9D',
    marginLeft: 40,
  },
  seeMore: {
    color: '#6A4029',
    fontWeight: '400',
    fontSize: 15,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 310,
  },
  cardWrap: {
    width: Dimensions.get('window').width / 1.5,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    elevation: 10,
    height: 250,
    width: '85%',
    borderRadius: 20,
    marginTop: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#000000',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    color: '#6A4029',
  },
  imgContainer: {
    width: '60%',
    height: '70%',
    borderWidth: 1,
    borderColor: 'white',
    // borderRadius: 100,
    position: 'absolute',
    top: -5,
    zIndex: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    // borderRadius: 4,
    // borderWidth: 1,
    // borderColor: '#ddd',
    marginRight: 8,
  },
  firstTab: {
    marginLeft: 16,
  },
  activeTab: {
    // backgroundColor: '#EFEFEF',
    borderBottomWidth: 1,
    borderColor: '#6A4029',
  },
  tabLabel: {
    fontWeight: 'bold',
  },
  activeTabLabel: {
    color: '#6A4029',
  },
});

export default styles;
