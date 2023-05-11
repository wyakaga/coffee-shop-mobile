import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '700',
    opacity: 0.75,
  },
  hero: {
    width: 130,
    height: 130,
    borderRadius: 100,
    // borderWidth: 1.5,
    // borderColor: '#6A4029',
  },
  choosePhoto: {
    width: 120,
    height: 50,
    textAlign: 'center',
    backgroundColor: '#895537',
  },
  takePhoto: {
    width: 120,
    height: 50,
    textAlign: 'center',
    backgroundColor: '#FFBA33',
    color: '#000',
  },
  header: {
    fontWeight: '900',
    fontSize: 34,
    marginTop: 60,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  saveChange: {
    marginVertical: 30,
    paddingLeft: 91,
    paddingRight: 91,
    padding: 20,
    fontSize: 17,
    fontWeight: '700',
  },
  edit: {
    width: 35,
    height: 35,
    position: 'absolute',
    bottom: 2,
    right: 2,
  },
});

export default styles;
