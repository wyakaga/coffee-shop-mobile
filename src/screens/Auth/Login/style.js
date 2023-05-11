import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  title: {
    paddingLeft: 30,
    marginTop: 60,
    marginHorizontal: 0,
    color: '#fff',
    fontSize: 65,
    fontWeight: '700',
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
  loginGoogle: {
    width: 352,
    height: 70,
    paddingLeft: 125,
    paddingTop: 23,
    fontSize: 17,
    fontWeight: '500',
    backgroundColor: '#fff',
    borderColor: '#fff',
    color: '#000000',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    borderBottomColor: 'white',
    flex: 1,
  },
  borderText: {
    color: 'white',
    marginHorizontal: 10,
  },
  buttonGroup: {
    marginHorizontal: 30,
    marginTop: 15,
    paddingBottom: 50,
  },
  errorMsg: {
    color: 'red',
    fontWeight: '500',
  },
});

export default styles;
