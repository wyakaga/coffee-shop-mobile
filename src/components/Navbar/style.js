import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  navbar: {
    height: 90,
    backgroundColor: '#ffffff',
    // borderBottomEndRadius: 15,
    // borderBottomStartRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 46,
    paddingLeft: 46,
    // elevation: 10,
  },
  hamburger: {
    marginTop: 49.5,
    width: 20,
    height: 16,
  },
  cart: {
    marginTop: 45,
    width: 22,
    height: 22,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: -12,
    backgroundColor: 'red',
    borderRadius: 60,
    width: 20,
    height: 20,
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
  },
});

export default styles;
