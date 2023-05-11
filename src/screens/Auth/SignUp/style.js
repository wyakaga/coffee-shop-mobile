import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 65,
    lineHeight: 70,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 150,
  },
  signupForm: {
    width: '90%',
    marginHorizontal: 20,
    marginTop: 45,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  login: {
    width: 352,
    height: 70,
    paddingLeft: 120,
    paddingTop: 23,
    fontSize: 17,
    fontWeight: '700',
    backgroundColor: '#6A4029',
    borderColor: '#6A4029',
    color: '#fff',
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
  errorMsg: {
    color: 'red',
    fontWeight: '500',
  },
});

export default styles;
