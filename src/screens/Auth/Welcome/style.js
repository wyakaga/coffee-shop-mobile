import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    // position: 'relative',
  },
  text: {
    color: 'white',
    fontSize: 65,
    lineHeight: 65,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 100,
    // position: 'absolute',
    // top: 190,
    // left: 45,
  },
  getStarted: {
    // position: 'absolute',
    // bottom: 45,
    // left: 20,
    // width: 352,
    height: 70,
    // paddingLeft: 137,
    paddingTop: 23,
    fontSize: 17,
    fontWeight: '700',
    backgroundColor: '#FFBA33',
    borderColor: '#FFBA33',
    color: '#000',
    textAlign: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    paddingHorizontal: 25,
    // position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default styles;
