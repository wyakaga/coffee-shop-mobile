import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 65,
    // fontWeight: '700',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginTop: 55,
    color: 'white',
  },
  desc: {
    fontSize: 14,
    // fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginTop: 25,
    color: 'white',
  },
  send: {
    width: '90%',
    height: 70,
    paddingTop: 22,
    fontSize: 17,
    // fontWeight: '700',
    fontFamily: 'Poppins-Bold',
    marginTop: 25,
    marginHorizontal: 20,
    textAlign: 'center',
    backgroundColor: '#FFBA33',
    borderColor: '#FFBA33',
  },
  resend: {
    width: '90%',
    height: 70,
    paddingTop: 22,
    fontSize: 17,
    // fontWeight: '700',
    fontFamily: 'Poppins-Bold',
    marginTop: 25,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  image: {
    flex: 1,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
  errorMsg: {
    color: 'red',
    // fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
});

export default styles;
