import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    // fontWeight: '700',
    fontFamily: 'Poppins-Bold',
    marginLeft: 60,
    marginVertical: 10,
    color: '#000000',
  },
  cardWrap: {
    width: Dimensions.get('window').width / 2,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    height: 190,
    width: '95%',
    borderRadius: 40,
    justifyContent: 'flex-end',
    alignItems: 'center',
    shadowColor: '#393939',
    shadowOffset: {
      width: 0,
      height: 30,
    },
    shadowOpacity: 0.1,
    shadowRadius: 60,
    elevation: 2,
  },
  productTitle: {
    fontSize: 20,
    // fontWeight: '900',
    fontFamily: 'Poppins-ExtraBold',
    color: '#6A4029',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 15,
    // fontWeight: '700',
    fontFamily: 'Poppins-Bold',
    paddingBottom: 10,
  },
  imgContainer: {
    width: '60%',
    height: '60%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 100,
    position: 'absolute',
    top: -5,
    zIndex: 4,
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
    // marginBottom: 20,
    borderWidth: 0.3,
    borderColor: 'transparent',
    paddingLeft: 46,
    backgroundColor: '#EFEEEE',
    fontSize: 17,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    // borderRadius: 4,
    // borderWidth: 1,
    // borderColor: '#ddd',
    // marginRight: 8,
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
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },
  activeTabLabel: {
    color: '#6A4029',
  },
  btnSort: {
    padding: 8,
  },
  btnSortText: {
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  modalItem: {
    paddingVertical: 8,
  },
  notFound: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#6A4029',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 60,
  },
});

export default styles;
