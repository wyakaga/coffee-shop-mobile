import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  loginForm: {
    width: '90%',
    marginHorizontal: 20,
    marginTop: 130,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  login: {
    width: 352,
    height: 70,
    paddingLeft: 155,
    paddingTop: 23,
    fontSize: 17,
    fontWeight: '700',
    backgroundColor: '#FFBA33',
    borderColor: '#FFBA33',
    color: '#000',
  },
  google: {
    position: 'absolute',
    bottom: 23,
    left: 85,
    zIndex: 2,
  },
  overlay: {
    backgroundColor: 'white',
    flex: 1,
  },
  borderGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  borders: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    flex: 1,
  },
  borderText: {
    color: 'black',
    marginHorizontal: 10,
  },
  buttonGroup: {
    marginHorizontal: 30,
    marginTop: 55,
    paddingBottom: 50,
  },
  errorMsg: {
    color: 'red',
    fontWeight: '500',
  },
});

export default styles;
