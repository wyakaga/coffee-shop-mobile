import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  navbar: {
    height: 90,
    backgroundColor: '#ffffff',
    // borderBottomEndRadius: 15,
    // borderBottomStartRadius: 15,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    columnGap: 30,
    paddingRight: 46,
    paddingLeft: 46,
    // elevation: 10,
  },
  chevron: {
    marginTop: 49.5,
    width: 20,
    height: 16,
  },
  title: {
    marginTop: 45,
    // width: 22,
    // height: 22,
    // position: 'relative',
    fontSize: 17,
    // fontWeight: '900',
    fontFamily: 'Poppins-Black',
    color: '#000000',
    textAlign: 'center',
  },
});

export default styles;
