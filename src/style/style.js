import React, {StyleSheet, Dimensions, Platform} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loginInput: {
    height: 40,
  },
  container1: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    maxHeight: 280,
    width: '90%',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#acc8e5',
  },

  loginContainer2: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    maxHeight: 280,
    width: '95%',
    padding: 10,
    borderRadius: 8,
  },

  loginContainer1: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    maxHeight: 340,
    minHeight: 290,
    width: '90%',
    padding: 20,
    borderRadius: 8,
  },
  loginButton: {
    backgroundColor: '#1660ab',
    height: 40,
    width: '100%',
  },

  searchButton: {
    backgroundColor: '#1660ab',
    height: 40,
    flex: 1,
    marginRight: 5,
    borderRadius: 20,
  },
  searchButton1: {
    backgroundColor: '#89acd0',
    height: 40,
    flex: 1,
    marginLeft: 5,
    textAlign: 'center',
    borderRadius: 20,
  },
  containerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    zIndex: 99999,
    fontSize: 10,
  },
  searchButtonText: {
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ffba00',
    height: 40,
    width: '100%',
  },

  content1: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'column',
  },

  logoContainer: {
    height: '5%',
    paddingTop: 10,
    marginTop: 0,
    alignItems: 'center',
  },

  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    height: '100%',
  },

  versionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    paddingTop: 20,
    width: '20%',
    alignSelf: 'center',
  },

  forgetPassContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    height: '90%',
  },

  logo: {
    height: 20,
    alignItems: 'center',
  },
  logomin: {
    height: 15,
  },

  headerContainer: {
    backgroundColor: '#FFF',
  },

  searchTitle: {
    textAlign: 'center',
    fontSize: 22,
    color: '#1660ab',
    paddingBottom: 20,
    paddingTop: 20,
  },

  searchDescription: {
    color: '#666',
    fontSize: 13,
  },

  greeting: {
    textAlign: 'center',
    fontSize: 22,
    color: '#1660ab',
    textTransform: 'uppercase',
    paddingBottom: 10,
  },

  forgetPass: {
    textAlign: 'center',
    color: '#1660ab',
  },

  helpLink: {
    textAlign: 'right',
    color: '#1660ab',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
  },

  footerColor: {
    backgroundColor: '#1660ab',
  },
  input: {
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 0,
    paddingBottom: 0,
    fontSize: 15,
    paddingLeft: 10,
    height: 40,
  },

  input1: {
    margin: 20,
    paddingBottom: 0,
    fontSize: 18,
    paddingLeft: 10,
    height: 40,
  },
  blockContainer: {
    backgroundColor: '#E5E5E5',
  },
  blockTime: {
    width: '48%',
    margin: '1%',
    aspectRatio: 1,
    backgroundColor: '#6ABEF0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    color: '#fff',
    flex: 1,
  },
  blockSalary: {
    width: '48%',
    margin: '1%',
    aspectRatio: 1,
    backgroundColor: '#3E91C5',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    color: '#fff',
    flex: 1,
  },
  blockPhone: {
    width: '48%',
    margin: '1%',
    aspectRatio: 1,
    backgroundColor: '#105CA6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    color: '#fff',
    flex: 1,
  },
  blockUser: {
    width: '48%',
    margin: '1%',
    aspectRatio: 1,
    backgroundColor: '#143758',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    color: '#fff',
    flex: 1,
  },
  blockSoon: {
    width: '48%',
    margin: '1%',
    aspectRatio: 1,
    backgroundColor: '#8D8D8D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    color: '#fff',
    flex: 1,
  },

  whiteText: {
    color: '#fff',
    width: '100%',
    alignItems: 'center',
    fontSize: 18,
    margin: 0,
    padding: 0,
  },
  blackText: {
    color: '#8D8D8D',
    width: '100%',
    alignItems: 'center',
    fontSize: 18,
    margin: 0,
    padding: 0,
  },

  parent: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  child: {
    width: '48%',
    margin: '1%',
  },

  textContainer: {
    padding: 10,
  },

  iconBlock: {
    width: 45,
    padding: 0,
  },
  headline: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  footer_logo: {
    height: 30,
    width: 30,
    marginTop: 15,
    marginBottom: 10,
  },
  footer_text: {
    fontSize: 13,
    color: '#fff',
    marginBottom: 10,
    textTransform: 'capitalize',
    width: '100%',
    textAlign: 'center',
    paddingLeft: 0,
    paddingRight: 0,
  },

  footer_container: {
    height: 80,
  },
  headerTitle: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    margin: 0,
  },
  selected: {backgroundColor: '#72C270'},

  itemText: {
    color: 'black',
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },

  //New Home Page

  homeList: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  homeContent: {
    paddingTop: 5,
    paddingBottom: 20,
  },
  homeListImage: {
    height: 100,
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#1660AB',
    borderRadius: 5,
    marginTop: 5,
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#6abdef',
    borderRadius: 5,
    marginTop: 5,
  },
  salaryContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#4090c4',
    borderRadius: 5,
    marginTop: 5,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#4090c4',
    borderRadius: 5,
    marginTop: 5,
  },
  tdContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#f26d4b',
    borderRadius: 5,
    marginTop: 5,
  },
  phoneContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#1660ab',
    borderRadius: 5,
    marginTop: 5,
  },
  eventContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#1b3a59',
    borderRadius: 5,
    marginTop: 5,
  },
  leftText: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '80%',
    paddingLeft: 10,
  },
  leftText1: {color: 'white', fontSize: 22},
  leftText2: {color: 'white', fontSize: 12, fontWeight: '100'},
  rightImage: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '20%',
    paddingBottom: 10,
    paddingTop: 10,
  },

  //tokyo2020
  countDownImgContainer: {
    width: '28%',
    justifyContent: 'center',
    borderRightColor: '#e1e1e1',
    alignItems: 'center',
    borderRightWidth: 1,
  },
  countDownDigitContainer: {
    width: '18%',
    justifyContent: 'center',
    borderRightColor: '#e1e1e1',
    fontWeight: '100',
    alignItems: 'center',
    borderRightWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
  countDownDigitText: {
    fontSize: 24,
    color: '#253266',
    fontWeight: '100',
  },
  tabContainer: {
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
    borderTopWidth: 1,
    borderTopColor: '#9f122c',
  },
  tabContainerActive: {
    backgroundColor: '#9f122c',
  },
  tabContainerStyle: {
    backgroundColor: '#fff',
  },
  loader: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE',
  },
  medalSilver: {
    backgroundColor: '#dde2e3',
    borderColor: '#c4cdcf',
    borderWidth: 1,
  },
  medalBronze: {
    backgroundColor: '#c2a07a',
    borderColor: '#a68764',
    borderWidth: 1,
  },
  scrollMyinfo: {
    height: Dimensions.get('window').height - 300,
  },
  scrollOther: {
    height: Dimensions.get('window').height - 351.5,
  },
  //New Login Page css
  Loginbox1: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginShape: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '-10%',
  },
  loginLogo: {
    width: '20%',
    height: '20%',
    position: 'absolute',
    top: '10%',
  },
  loginText: {
    position: 'absolute',
    top: '33%',
    color: '#fff',
    fontSize: 18,
  },
  Loginbox2: {
    height: '50%',
  },
  loginTool: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
  },
  loginToolBox1: {
    width: '75%',
  },
  loginToolBox2: {
    width: '25%',
    alignItems: 'flex-end',
  },
  bottomContent: {
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    height: Platform.OS == 'ios' ? 65 : 75,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  bottomButton: {
    marginTop: Platform.OS == 'ios' ? 15 : 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomItemContainer: {
    borderWidth: 1,
    borderColor: '#1660AB',
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  bottomText: {
    fontSize: Platform.OS == 'ios' ? 11 : 10,
    textAlign: 'center',
    color: '#1660AB',
  },
});
