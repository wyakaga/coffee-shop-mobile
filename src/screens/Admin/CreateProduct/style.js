import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 17,
    color: '#000000',
    fontFamily: 'Poppins-Black',
    opacity: 0.75,
  },
  hero: {
    width: 200,
    height: 200,
    borderRadius: 100,
    // borderWidth: 1.5,
    // borderColor: '#6A4029',
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
  addImage: {
    borderRadius: 100,
    backgroundColor: '#895537',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 75,
  },
  tabContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginTop: 30,
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 8,
  },
  firstTab: {
    marginLeft: 0,
  },
  activeTab: {
    backgroundColor: '#6A4029',
    borderColor: '#6A4029',
  },
  tabLabel: {
    fontFamily: 'Poppins-Bold',
  },
  activeTabLabel: {
    color: 'white',
  },
  saveProduct: {
    marginVertical: 30,
    // paddingLeft: 91,
    // paddingRight: 91,
    // padding: 20,
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
  },
  closeHandler: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#DC143C',
  },
  disabledButtonStyle: {
    backgroundColor: '#F2F2F2',
    color: '#9F9F9F',
    borderColor: '#9F9F9F',
  },
});

export default styles;
